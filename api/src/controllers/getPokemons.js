const{Pokemon,Types}= require('../db.js')
const axios = require("axios")



    let getPokemonApi= async()=>{
        
        let info = [];
        for (let i = 1; i <= 40; i++) {
            info.push( await axios.get('https://pokeapi.co/api/v2/pokemon/' + i));
        }
        
        return Promise.all(info)
        .then(response=>{
    
            const pokemones= response.map(el=>{
               return el ={
                    nombre: el.data.name,
                    id: el.data.id,
                    img:el.data.sprites.other.dream_world.front_default ? el.data.sprites.other.dream_world.front_default : "",
                    types: el.data.types.map(el=>el.type.name) ? el.data.types.map(el=>el.type.name) : "",
                    vida:el.data.stats[0].base_stat ? el.data.stats[0].base_stat : "",
                    fuerza:el.data.stats[1].base_stat ? el.data.stats[1].base_stat : "",
                    defensa:el.data.stats[2].base_stat ? el.data.stats[2].base_stat : "",
                    velocidad:el.data.stats[5].base_stat ? el.data.stats[5].base_stat : "",
                    altura:el.data.height ? el.data.height : "",
                    peso:el.data.weight ? el.data.weight : ""
                }
            })
            
            return pokemones;
        })
        .catch(e=> console.log("Error en la request a la Api: " + e))
       
      
    }
    
    
     let getPokemonBd= async()=>{
        try{
            return await Pokemon.findAll({
                attributes:['nombre','id','vida','fuerza','defensa','velocidad','altura','peso'],
                include:{
                 model:Types
                }
            })
        }
        catch(e){
            console.log("ERROR en getPokemonBd" + e)
            return e;
        }
    }
    //uno pokems de api con BD 
    let getAllPokemons = async()=>{
        try{
            let[api,bd]= await Promise.all([getPokemonApi(),getPokemonBd()])
           let json=bd.map(el=>{ return el.toJSON()})
           let infoTotal= [...api,...json];
            return infoTotal;
        }
        catch(e){ 
            console.log("ERROR en getPokemons" + e )
            return e
        }
    }

    
    module.exports={
        getPokemonApi,
        getPokemonApi,
        getAllPokemons
    }
