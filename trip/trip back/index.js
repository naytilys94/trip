const Sequelize = require('sequelize')
const sequelize = new Sequelize('mariadb://root@localhost/test')
const _ = require('lodash')


const graphql = require('graphql')
const cors = require(`cors`)
var express = require('express')
var express_graphql = require('express-graphql')
const {buildSchema} = require('graphql')
const fs = require('fs')

const multer  = require("multer")
var ExifImage = require('exif')

const parseGpx = require('parse-gpx')

const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')


var app = express()
app.use(cors())

app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit:50000 }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.static("../trip front/public/upload/"))

const upload = multer({dest:"../trip front/public/upload/"})
const uploadTrip = multer({dest:"../trip front/public/upload/treks"})

////////////////////////////////////////////////////
const secret= `njncfvsqrkx`


function jwtWare() {
    return expressJwt({ secret }).unless()
}
function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }
    if (err.name === 'UnauthorizedError') { //отлавливает ошибку, высланную из expressJwt
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }
    // default to 500 server error
    return res.status(500).json({ message: err.message });
}

// api routes
//app.use(jwtWare())

// global error handler
app.get('/', (req, res, next) => {
    res.json({all: 'ok'})
    //next()
})
app.use(errorHandler)

/////////////////////UPLOAD PHOTO ////////////////////////
var GPSPhoto=''
function returnGpsCoord(gps) {
  GPSPhoto = gps
}
async function arrayGpsInfo(array, infoPhoto){

  for(let item of array){
    let infoGps = {}
    let road = item.filename
    await gpsCoord(road)
    infoGps.originalName = item.originalname
    infoGps.serverName = road
    infoGps.gps = GPSPhoto
    infoPhoto.push(infoGps)
  }
  return infoPhoto ///////////// this coordinates photo
}

function gpsCoord(road) {
  return new Promise(resolve => {
    new ExifImage({ image : `../trip front/public/upload/${road}` }, async function (error, exifData) {
      let GPSPhoto=''
      let gps = {}
      let gpsObj= {}
      error ? GPSPhoto = JSON.stringify("Error") :
      (
        gpsObj = exifData.gps,
        gps.Latitude=`${gpsObj.GPSLatitude[0]}°${gpsObj.GPSLatitude[1]}\'${gpsObj.GPSLatitude[2]}\'\'${gpsObj.GPSLatitudeRef}`,
        gps.Longitude=`${gpsObj.GPSLongitude[0]}°${gpsObj.GPSLongitude[1]}\'${gpsObj.GPSLongitude[2]}\'\'${gpsObj.GPSLongitudeRef}`,
        GPSPhoto = await JSON.stringify(gps)
      )
      returnGpsCoord(GPSPhoto)
      resolve()
    })
  })
}

//////////////////uploads treks///////////////////

app.post("/user/newtrip/", uploadTrip.single('trekInfo'), async function (req, res) {
  let filedata = req.file
  let road = filedata.filename

  let file = `../trip front/public/upload/treks/${road}`
  let trekinfo=''

  await parseGpx(file).then(track => {
    trekinfo = JSON.stringify(track)
  })
  res.json(trekinfo)
})

app.post("/photos", upload.array('photoInfo'), async function (req, res) {
  console.log(req.files)
  let filedata = req.files
  let infoPhoto = []
  await arrayGpsInfo(filedata, infoPhoto)
  console.log(infoPhoto)
  res.json(JSON.stringify(infoPhoto))
})
/////////////////////////MODEL/////////////////////////////////////
class User extends Sequelize.Model {
  get trips(){
    return this.getTrips()
  }
}
User.init({
  login: Sequelize.STRING,
  name: Sequelize.STRING,
  surname: Sequelize.STRING,
  password: Sequelize.STRING,
  birthday: Sequelize.STRING,
  aboutyou: Sequelize.STRING,
  },
  { sequelize, modelName: 'user' }
)

class Trip extends Sequelize.Model {

  get photos(){
      return this.getPhotos()
  }
}

Trip.init({
	title: Sequelize.STRING,
    country: Sequelize.STRING,
    region: Sequelize.STRING,
    text: Sequelize.TEXT,
    trek: Sequelize.TEXT('medium'),
  },
  { sequelize, modelName: 'trip' }
)

class Photo extends Sequelize.Model {}

Photo.init({
  originalname: Sequelize.STRING,
  servername: Sequelize.STRING,
  text: Sequelize.TEXT
  },
  { sequelize, modelName: 'photo' }
)

User.belongsToMany(Trip, {through: "UserTrip"})
Trip.belongsTo(User)

Trip.belongsToMany(Photo, {through: "TripPhoto"})
Photo.belongsTo(Trip)

;(async () => {
    await sequelize.sync()
})()

/////////////////GRAPHQL/////////////////////////
var schema = buildSchema(`

	type Query {
		getUser(id: Int!): User
		getUsers: [User]
		getTrip(id: Int!): Trip
		getTrips(region: String, country: String, title: String): [Trip]
		getPhoto(id: Int!): Photo
		getPhotos: [Photo]
	}

	type Mutation {
    authenticate(login: String!, password: String!): User
		createUser(login: String!, name: String!, surname: String!, password: String!, birthday: String!, aboutyou: String!): User
		createTrip(id: String!, title: String!, country: String!, region: String!, text: String!, trek: String!): Trip
		createPhoto(id: String!, originalname: String!, servername: String!, text:String, gpsinfo: String!): Photo
	}

	type User {
		  id: ID
      login : String
		  name: String
      surname: String
  		password: String
      birthday: String
      aboutyou: String
  		trips: [Trip]
	}

	type Trip {
    id: ID
		title: String
		country: String
  	region: String
  	text: String
    trek: String
    photos: [Photo]
	}

	type Photo {
		id: ID
		originalname: String
    servername: String
    text: String
    gpsinfo: String
	}
`)
////////////////////GRAPHQL FUNCTION/////////

async function authenticate({ login, password }, {secret}) { //контроллер авторизации
  const user = await User.findOne({where: {"login": login, "password": password}})
  if(user){
    const token = jwt.sign({ user: _.pick(user, ["id", "login"]) }, secret) //подписываeм
    user.token = token
    return user
  }
}

async function getUser({id}){
   return await User.findOne({where: {
                    "id": id}
                  })
}
async function getUsers(){
   return await User.findAll({})
}
async function getTrip({id}){
 return  await Trip.findOne({where: {"id": id}
                  })
}
async function getTrips({region, country, title}){
    if(region && country && title){
     return  await Trip.findAll({
                where: {"region": region,
                        "country": country,
                        "title": title}
                })
    }
    else if(region && country){
      return await Trip.findAll({
        where: {"region": region,
                "country": country}
        })
    }
    else if(region){
      return await Trip.findAll({
          where: {"region": region}
          })
    }
    else return await Trip.findAll({})
 }

async function getPhoto({id}){
   return await Photo.findOne({where: {
                    "id": id}
                  })
}
async function getPhotos(){
   return await Photo.findAll({})
}

async function createUser(login, name, surname, password, birthday, aboutyou){
	let user = await User.create(login, name, surname, password, birthday, aboutyou)
	return user
}

async function createTrip({id, title, country, region, text, trek}){
  let trip = await Trip.create({title, country, region, text, trek })
  let user = await User.findOne({where: {"id": id}})
  user.addTrip(trip, {through: {status: "started"}})
  return trip
}

async function createPhoto({id, originalname, servername, text, gpsinfo}){
  let photo = await Photo.create({originalname, servername, text, gpsinfo})
  let trip = await Trip.findOne({where: {"id": id}})
  trip.addPhoto(photo, {through: {status: "started"}})
  return photo
}

var root = {
  authenticate,
 	getUser,
	getUsers,
	getTrip,
	getTrips,
	getPhoto,
	getPhotos,
	createUser,
	createTrip,
	createPhoto
}

app.use('/graphql', express_graphql(req =>({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: {user: req.user}
    })
))
/////////////////////////////JWT/////////////////////////////////////

function jwtWare() {
    return expressJwt({ secret }).unless()
}
function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }
    if (err.name === 'UnauthorizedError') { //отлавливает ошибку, высланную из expressJwt
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }
    // default to 500 server error
    return res.status(500).json({ message: err.message });
}

// api routes
//app.use(jwtWare())

// global error handler
app.get('/', (req, res, next) => {
    res.json({all: 'ok'})
    //next()
})
app.use(errorHandler)

///////////////////////////////////////////////////////////////

const port = 4000
app.listen(port , () => console.log(`Example app listening on port ${port} !`)

)

