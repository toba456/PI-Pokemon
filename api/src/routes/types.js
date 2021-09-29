
const { Router } = require('express');
const router = Router();
const {Types}= require('../db.js')

router.get("/",async(req,res)=>{
    let types= await Types.findAll({
        attributes:{
            exclude:['createdAt',"updatedAt"]
        }
    })
    try{
        res.status(200).json(types);
    }
    catch(e){
        res.status(400).send(e);
    }
})


module.exports=router;