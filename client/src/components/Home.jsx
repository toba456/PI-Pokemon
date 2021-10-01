import React from "react";
import { GetPokemons } from "../actions";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card";




export default function Home(){

    const dispatch= useDispatch();
    const allPokemons= useSelector(state=> state.allPokemons);

    useEffect(()=>{
        dispatch(GetPokemons());
    },[]);
    
     
     
    return(
        <div>
            
            <select>
                    <option value="Asc">Ascendente</option>
                    <option value="Desc">Descendente</option>
                    <option value="AtoZ">Alfabetico</option>
           </select>
           <select>
                    <option value="All">Todos</option>
                    <option value="Exist">Existentes</option>
                    <option value="Creat">Creados</option>
           </select>
           <select>
                    <option value="All">Tipo</option>
                    <option value="stre">Fuerza</option>
           </select>
            <div>
           {
               allPokemons?.map(el=>{
                  return( <Link to={"/pokemons/:" + el.id}> <Card  key={el.id} name={el.nombre} img={el.img} types={el.types} /> </Link>
               )})
           }
            </div>
        </div>
        
    )
}