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

