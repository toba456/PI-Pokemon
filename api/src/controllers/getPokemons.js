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
                    name: el.data.name,
                    id: el.data.id,
                    img:el.data.sprites.other.dream_world.front_default,
                    types: el.data.types.map(el=>el.type.name)
                }
            })
            
            return pokemones;
        })
        .catch(e=> console.log("Error en la request a la Api: " + e))
       
      
    }
    
    
     let getPokemonBd= async()=>{
        try{
            return await Pokemon.findAll({
                attributes:['name','id',],
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
            const[api,bd]= await Promise.all([getPokemonApi(),getPokemonBd()])
           let json=bd.map(el=>{ return el.toJSON()})
           const infoTotal= [...api,...json];
           console.log(infoTotal)
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
