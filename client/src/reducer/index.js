
const initialState={
    allPokemons:[]
}

function rootReducer(state=initialState,action){
        
    switch(action.type){
        case "GET_POKEMONS":
           return{
                ...state, 
                allPokemons: action.payload
            }

        default: return state;    
    }
}


export default rootReducer;