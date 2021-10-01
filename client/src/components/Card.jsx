import React from "react";


export default function Card({name,img,types}){

    return(
        <div style={{margin:"0 auto", background:"red", width:"210px" } }>
            <h3 style={{textDecoration:"none"}}>{name}</h3>
            <img src={img?img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"} alt={name} height="250px" width="200px"/>
            {   
                types?.map(el=>{
                    return(
                        <h5 key={el}>{el}</h5>
                    )
                })
            }
        </div>   
    )
}