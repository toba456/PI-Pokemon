
const { Router } = require('express');
const router = Router();
const {getAllPokemons}= require ("../controllers/getPokemons.js")
const {Pokemon}= require('../db.js')

router.get("/",async(req,res)=>{
    
        const {nombre}=req.query;
        const allPokemons= await getAllPokemons(nombre);
    try{
        !allPokemons.length ?                   // si no tiene nada es porque no encontro el nombre x query
        res.status(404).send(nombre + " no existe") :
        res.status(200).send(allPokemons)  
    }
    catch(e){console.log("Error en get /pokemons : " + e)}
})



router.get("/:idPokemon",async(req,res)=>{
    
    const{idPokemon}= req.params;
    const pokemones= await getAllPokemons();
    try{
        if(idPokemon){
            let pokemonDetail= pokemones.filter(el=>{
              return   el.id == idPokemon ;
            })
            pokemonDetail.length > 0 ?
             res.status(200).send(pokemonDetail) :
             res.status(404).send("Pokemon no encontrado ")
        }
    }
    catch(e){console.log("Error en get /:idPokemon: " + e)}

})


router.post("/",async(req,res)=>{
    const {nombre,id,vida,fuerza,defensa,velocidad,altura,peso,types}=req.body;

    try{
        let createdPokemon= await Pokemon.create({
            
                nombre:nombre.toLowerCase(),
                id,
                vida,
                fuerza,
                defensa,
                velocidad,
                altura,
                peso,   
        })
         createdPokemon.addTypes(types)
         createdPokemon ?
         res.status(200).send( nombre + " creado con exito"):
         res.status(400).send("No se pudo crear pokemon")
    }
    catch(e){
        console.log("Error en post /pokemons: " + e)
    }
})


module.exports= router;