
const { Router } = require('express');
const router = Router();
const {getAllPokemons}= require ("../controllers/getPokemons.js")

router.get("/",async(req,res)=>{
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

module.exports= router;