import React from 'react'
import {Input} from "./components/input.jsx"
import {Graph} from "./Function/graphQLFetch.js"
import {TextArea} from "./components/textarea.jsx"

export class NewTrip extends React.Component{
  state=  {photoInfo: [], photoLoad: true, trekGps: '', tripsId: ''}

Send = this.Send.bind(this)
SendPhoto = this.SendPhoto.bind(this)
SavePhotoInfo = this.SavePhotoInfo.bind(this)
PhotoLoad = this.PhotoLoad.bind(this)
PhotoView = this.PhotoView.bind(this)
SendTrip = this.SendTrip.bind(this)
CreateTrip = this.CreateTrip.bind(this)

  PhotoLoad() {
    this.setState({photoLoad: false})
  }
  PhotoView(array){
      let photo= []
      for(let item in array){
        photo.push(
          <div>
            <img className="newTrip-PhotoViewOne" src={`../upload/${array[item].serverName}`} />
            <input value={this.state.photoInfo[item].text}
              onChange={(e) =>{
                this.state.photoInfo[item].text = e.target.value
                this.setState({photoInfo: this.state.photoInfo})
                console.log(this.state.photoInfo)}}
            />
          </div>
        )
      }
      return photo
  }
  async SendPhoto(){

      let formPhoto= document.getElementById("formPhoto")
        formPhoto.onsubmit = async (e) => {
                e.preventDefault()
      }

      let photoInfo = await fetch(`http://localhost:4000/photos`, {
        method: "post",
        headers: {
          'authorization': window.localStorage.userToken
        },
        body: new FormData(formPhoto)
      })
      let res= JSON.parse(await photoInfo.json())
      this.SavePhotoInfo(res)
  }
  SavePhotoInfo(result){
    let photoInfo=[]
    for(let item in result){
      photoInfo.push({
        originalName: result[item].originalName,
        serverName: result[item].serverName,
        gps: result[item].gps,
        text: ''
      })
    }
    this.setState({photoInfo: photoInfo})
    this.PhotoLoad()
  }
  async SendTrip() {

    let formTrek= document.getElementById("formTrek")
    formTrek.onsubmit = async (e) => {
      e.preventDefault()
    }

    let trekInfo= await fetch(`http://localhost:4000/user/newtrip`, {
      method: "post",
      headers: {
        'authorization': window.localStorage.userToken
      },
      body: new FormData(formTrek)
    })
    let result = await trekInfo.json()
    await this.setState({trekGps: result})
  }
  async CreateTrip(){

    let query = `mutation
      createTrip($id: String!, $title: String!, $country: String!, $region: String!, $text: String!, $trek: String!  ) {
        createTrip(id: $id, title: $title, country: $country, region: $region, text: $text, trek: $trek ) {
          id
          title
          country
          region
          text
          trek
        }}`
    let variables = {id: window.localStorage.userId, title: this.props.newTrip.title, country: this.props.newTrip.country, region: this.props.newTrip.region, text: this.props.newTrip.aboutyou, trek: this.state.trekGps}
    let data = await Graph(query, variables)

    await this.setState({tripsId: data.createTrip.id})
  }
  async CreatePhoto() {

    for(let item in this.state.photoInfo){
      let query = `mutation
      createPhoto($id: String!, $originalname: String!, $servername: String!, $text: String, $gpsinfo: String!) {
        createPhoto(id: $id, originalname: $originalname, servername: $servername, text: $text, gpsinfo: $gpsinfo) {
          id
          originalname
          servername
          text
          gpsinfo
        }}`
      let variables = {id: this.state.tripsId, originalname: this.state.photoInfo[item].originalName, servername: this.state.photoInfo[item].serverName,  text: this.state.photoInfo[item].text, gpsinfo: this.state.photoInfo[item].gps}
      let data = await Graph(query, variables)

    }
  }
  async Send() {
    await this.SendTrip()
    await this.CreateTrip()
    await this.CreatePhoto()
  }
///////////////////////////////////////////////
  render() {
    return(
    	<div>
        <div>
	        <h1>новый трип</h1>
          <div className="newTrip-tripInfo">
		        <Input name={"title"} refreshRedux={this.props.title} />
		        <Input name={"country"} refreshRedux={this.props.country}/>
		        <Input name={"region"} refreshRedux={this.props.region} />
		        <TextArea name={"about you"} refreshRedux={this.props.aboutyou} />
            <br></br>
            <form id="formTrek">
              <input type="file" name="trekInfo" />
            </form>
          </div>

          <br></br>
          { this.state.photoLoad ?
            (
              <div className="newTrip-PhotoLoad">
                <span> add photo</span>
                <form id="formPhoto">
                  <input  type="file" name="photoInfo" multiple />
                </form>
              </div>
            ):
            (
              <div>
                <div className="newTrip-PhotoView">
                {this.PhotoView(this.state.photoInfo)}
                </div>
                <form id="formPhoto">
                  <input  type="file" name="photoInfo" multiple />
                </form>
              </div>
            )
          }
          <button onClick={this.SendPhoto}>photo</button>
        </div>
        <button disabled={!this.props.newTrip.title || !this.props.newTrip.country || !this.props.newTrip.region || !this.props.newTrip.region || !(this.props.newTrip.aboutyou) || !(this.props.newTrip.aboutyou.length >2)} onClick={this.Send} > Create </ button>

    </div>
	)}
}

