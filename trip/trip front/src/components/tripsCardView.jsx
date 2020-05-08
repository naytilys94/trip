import React from 'react'
import {TrekCard} from "./trekCard"

export let View = (p) =>{
	let trekCards = []
	for(let item in p.array){
		trekCards.push(<TrekCard id={p.array[item].id} />)
	}
		return(
			<div className="tripsCadrs" children={trekCards}>
			{trekCards}
			</div>
		)
}