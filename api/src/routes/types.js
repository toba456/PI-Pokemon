
const { Router } = require('express');
const router = Router();
const {Types}= require('../db.js')


router.get("/",async(req,res)=>{
    
    try{
        let types= await Types.findAll({
            attributes:{
                exclude:['createdAt',"updatedAt"]
            }
        })
        types ?
        res.status(200).json(types):
        res.status(400).send("Types no encontrados");
    }
    catch(e){
        console.log("Error en get /types: " + e)
    }
})


module.exports=router;