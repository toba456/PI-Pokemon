
const initialState={
    allPokemons:[],
    filter:[],
    types:[]
}

function rootReducer(state=initialState,action){
        
    switch(action.type){
        case "GET_POKEMONS":
           return{
                ...state, 
                allPokemons: action.payload,
                filter: action.payload
            }
        case "GET_TYPES":
             
                return{
                ...state,
                types: action.payload
            }
        case "GET_BY_TYPE":
                let all=state.filter;
                let filter = action.payload==="all" ? all : all.filter(el=>el.types.includes(action.payload))
                
                return{
                ...state,
                allPokemons: filter
            }

        default: return state;    
    }
}


export default rootReducer;