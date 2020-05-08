function ParseReadTime(milliseconds){
  let hours = milliseconds / (1000*60*60);
  let absoluteHours = Math.floor(hours);
  let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  let minutes = (hours - absoluteHours) * 60;
  let absoluteMinutes = Math.floor(minutes);
  let m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  let seconds = (minutes - absoluteMinutes) * 60;
  let absoluteSeconds = Math.floor(seconds);
  let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

  return h + ':' + m + ':' + s;
}

function Time(object){
	let firstTime = Date.parse(object[0].timestamp)
    let lastTime = Date.parse(object[(object.length-1)].timestamp)
    let time = ParseReadTime(lastTime-firstTime);
    return time
}

function Elevation(object){
	let maxHeight = object[0].elevation
	let minHeight = object[0].elevation

	for(let i=1;i<object.length;i++){

		if ((maxHeight - object[i].elevation)<0) maxHeight=object[i].elevation
	}
	for(let i=1;i<object.length;i++){
		if ((minHeight - object[i].elevation)>0) minHeight=object[i].elevation
	}
  let min = (+minHeight).toFixed(1)
  let max = (+maxHeight).toFixed(1)
	let Delta = (maxHeight - minHeight).toFixed(1)
	let height = {"max": max,
				  "min": min,
				  "delta": Delta}
 	return height
}


export function Parse(json){
    let trek = JSON.parse(json)
    let trekInfo={}
    trek[0].timestamp ? trekInfo.time=Time(trek) :  trekInfo.time="no information"
    trek[0].elevation ? trekInfo.height= Elevation(trek) : trekInfo.height="no information"
    return trekInfo
}
