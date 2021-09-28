const { DataTypes } = require('sequelize');

module.exports= (sequelize)=>{
    sequelize.define("types",{
        nombre:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}