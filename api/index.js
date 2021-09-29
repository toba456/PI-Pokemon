//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn,Types } = require('./src/db.js');
const axios=require('axios')
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
   
  server.listen(3001, async() => {
    let types= await axios.get('https://pokeapi.co/api/v2/type')
    let pokemonsTypes= types.data.results.map(el=>{
      return {
        nombre: el.name
      }
    })
    //aca cargo los tipos a la base de datos
    let create= pokemonsTypes.map(type=>{
      Types.create(type)
    })
    Promise.all(create)
      .then(res => {
        console.log('types added') 
      }) 
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
