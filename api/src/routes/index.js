const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios= require ('axios')
const router = Router();
const{Pokemon,Types}= require('../db.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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
        console.log(pokemones)
        return pokemones;
    })
    .catch(e=> console.log("Error en la request a la Api: " + e))
   
  
}


let getPokemonBd= async()=>{
    try{
        return await Pokemon.findAll({
            // attributes:['name','id','img','types'],
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

let getAllPokemons= async()=>{
    try{
        const[api,bd]= await Promise.all([getPokemonApi(),getPokemonBd()])
        const infoTotal= [...api,...bd];
        return infoTotal;
    }
    catch(e){ 
        console.log("ERROR en getPokemons" + e )
        return e
    }
}

router.get("/pokemons",async(req,res)=>{
    const {name}=req.query;
    const allPokemons= await getAllPokemons();
    if(name){
        let pokemonName= await allPokemons.filter(el=>{return el.name.toLowerCase().includes(name.toLowerCase())})
        pokemonName ?
        res.status(200).send(pokemonName):
        res.status(404).send("No se encuentra pokemon")

    }
    else{
        res.status(200).send(allPokemons)
    }
})

 
module.exports = router;
