var GPSPhoto=''
function returnGps(gps) {
  GPSPhoto = gps}

var ExifImage = require('exif')
async function gpsInfo(road) {
  try {
       new ExifImage({ image : `../trip front/uploads/${road}` },  function (error, exifData) {
            let GPSPhoto=''

            if (error) {
              let gps = {}
              gps.Latitude="Error"
              GPSPhoto = JSON.stringify(gps)
              }
            else {
              let gpsObj=exifData.gps
              let gps={}
              gps.Latitude=`${gpsObj.GPSLatitude[0]}°${gpsObj.GPSLatitude[1]}\'${gpsObj.GPSLatitude[2]}\'\'${gpsObj.GPSLatitudeRef}`
              gps.Longitude=`${gpsObj.GPSLongitude[0]}°${gpsObj.GPSLongitude[1]}\'${gpsObj.GPSLongitude[2]}\'\'${gpsObj.GPSLongitudeRef}`
              GPSPhoto = JSON.stringify(gps)
            }
            returnGps(GPSPhoto)
        })
  } catch (error) {
    let gps = {}
              gps.Latitude="Error"
              GPSPhoto = JSON.stringify(gps)
              returnGps(GPSPhoto)
    }
}


mutation createUser ($login: String!, $birthday: String!, $password: String!, $name: String!, $surname: String!, $aboutyou: String!) {
  createUser(login: $login, birthday: $birthday, password: $password, name: $name, surname: $surname, aboutyou: $aboutyou) {
    name
    birthday
    password
    login
    aboutyou
    surname
  }
}


{
  "login": "alex",
  "name": "alex",
  "surname": "isaev",
  "password": "111111",
  "birthday": "21081994",
  "aboutyou": "geek"
}




mutation createTrip($id: Int!,$title: String!, $country: String!, $region: String!, $text: String!){
  createTrip (id: $id, title: $title, country: $country, region: $region, text: $text){
    id
    title
    country
    region
    text
  }
}


{
  "id": 1,
  "title": "home3",
	"country": "Ukrs",
  "region": "asia",
  "text": "61"

}






mutation createTrek($id: Int!, $title: String!,  $trek: String!, $text: String!){
  createTrek (id: $id, title: $title, trek: $trek ,text: $text){
    id
    title
    trek
    text
  }
}


{
  "id": 90,
  "title": "dffd34343fdf",
  "trek": "erererer343433433pe",
  "text": "dsfdadfwadfaf"
}