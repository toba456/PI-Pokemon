import axios from 'axios';


export function GetPokemons(){
    return async function(dispatch){
        let pokemons= await axios.get("http://localhost:3001/pokemons");
        let action={
            type: "GET_POKEMONS",
            payload: pokemons.data
        }
        return dispatch(action);
    }
}

export function GetTypes(){
    return async function(dispatch){
        let types= await axios.get("http://localhost:3001/types");
        let action={
            type: "GET_TYPES",
            payload: types.data
        }
        return dispatch(action);
    }
}


export function GetPokemonsByType(payload){
    return{
        type: "GET_BY_TYPE",
        payload
    }
}
