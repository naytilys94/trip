import React from 'react'
import {ElemRedux} from "../redux/connectroute.jsx"

export let ElemsTemplate = p => {
    let storage = [];
    for (let elem of p.elems){
       storage.push(<ElemRedux name={elem} />)
    }
    return (
        <div className={p.name} children={storage} >
            {storage}
        </div>
    )
}