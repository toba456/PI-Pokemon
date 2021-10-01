import React, { useState,useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import { GetPokemons, GetTypes, GetPokemonsByType } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";




export default  function Home(){

    const dispatch= useDispatch();
    const allPokemons=  useSelector(state=> state.allPokemons);
    const types=  useSelector(state=> state.types);
    //paginado
    const [currentPage, setCurrentPage]= useState(1);
    const perPage=12;      
    const lastPokemon= currentPage * perPage;
    const firstPokemon= lastPokemon -  perPage;
    const currentPokemons= allPokemons.slice(firstPokemon,lastPokemon)

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(GetPokemons());
        dispatch(GetTypes());
    },[]);
         
    function handleFilterType(e){
        e.preventDefault();
        dispatch(GetPokemonsByType(e.target.value));
    }

    return(
        <div>
            <div>
                <select>
                    <option disabled selected value="">Orden alfabético</option>
                    <option value="Asc">Ascendente</option>
                    <option value="Desc">Descendente</option>
                </select>
                <select>
                    <option value="All">Todos</option>
                    <option value="Exist">Existentes</option>
                    <option value="Creat">Creados</option>
                </select>
                <select>
                    <option value="stre">Fuerza</option>
                </select>
                <select  onChange={(e)=> handleFilterType(e)}>
                    <option disabled selected value="">Tipo de pokemon</option>
                    <option value="all">Todos</option>
                    {
                        types?.map(tipo=>{
                           return( <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                        )})
                    }
                </select>
            </div>
            <div >
                <Paginado perPage={perPage} allPokemons={allPokemons.length} paginado={paginado}/>
           {
               currentPokemons?.map(el=>{
                  return( <Link key={el.id} to={"/pokemons/:" + el.id}> <Card  key={el.id} name={el.nombre} img={el.img} types={el.types} /> </Link>
               )})
           }
            </div>
        </div>
        
    )
}