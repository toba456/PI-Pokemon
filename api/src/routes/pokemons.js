
const { Router } = require('express');
const router = Router();
const {getAllPokemons}= require ("../controllers/getPokemons.js")
const {Pokemon,Types}= require('../db.js')

router.get("/",async(req,res)=>{
    const {nombre}=req.query;
    const allPokemons= await getAllPokemons();
    if(nombre){
        let pokemonName= await allPokemons.filter(el=>{
            return el.nombre.toLowerCase().includes(nombre.toLowerCase())
        })
        pokemonName ?
        res.status(200).send(pokemonName):
        res.status(404).send("No se encuentra pokemon con ese nombre")

    }
    else{
        res.status(200).send(allPokemons)
    }
})

router.get("/:idPokemon",async(req,res)=>{
    const{idPokemon}= req.params;
    const pokemones= await getAllPokemons();
    if(idPokemon){
        let pokemonDetail= pokemones.filter(el=>{
          return   el.id == idPokemon ;
        })
        pokemonDetail.length > 0 ?
         res.status(200).send(pokemonDetail) :
         res.status(404).send("Pokemon no encontrado ")
    }

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
         res.status(200).send( nombre + " creado con exito")
        
    }
    catch(e){
        res.status(400).send("No se pudo crear pokemon") 
        console.log(e)
    }
})


module.exports= router;