const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    vida:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fuerza:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    defensa:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    velocidad:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    altura:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    peso:{
      type: DataTypes.INTEGER,
      allowNull: true
    }

  });
};
