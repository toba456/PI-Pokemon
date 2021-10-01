import React from "react";


export default function Paginado({perPage,allPokemons,paginado}){
    const pageNumber=[];

    for(let i=0; i<=Math.floor(allPokemons/perPage); i++){
        pageNumber.push(i+1);
    }
    return(
        <div>
            <nav >
                
                <ul style={{ width:"10px", margin:"0 auto"}}>
                {
                   pageNumber?.map(number=>( 
                   <li key={number}> 
                      <a onClick={()=>paginado(number)}>{number}</a> 
                   </li>
                   ))
                }
                </ul>
            </nav>
        </div>
    )
}