import React from "react";


export default function Card({name,img,types}){
    console.log(types)

    return(
        <div>
            <h3>{name}</h3>
            <img src={img?img: "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"} alt={name} height="250px" width="200px"/>
            {
                types?.map(el=>{
                    return(
                        <h5>{ typeof el !== "object" ? el : el.nombre }</h5>
                    )
                })
            }
        </div>
    )
}