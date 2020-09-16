require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const POKEDEX = require('./pokedex.json');
console.log(process.env.API_TOKEN);
const cors = require('cors');
const helmet = require('helmet');
const app =express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(function validateBearerToken(req, res, next){

    console.log('lets validate bearer token')

  //const bearerToken= req.get('Authorization').split(' ')[1];
  const authToken = req.get('Authorization');
  const apiToken =process.env.API_TOKEN;

  console.log('validate bearer token mddleware');
//   if(bearerToken !== apiToken){
//       return res.status(401).json({error: 'Unauthorized!!!!'});
//   }

  if(!authToken || authToken.split(' ')[1] !== apiToken){
    return res.status(401).json({error: 'UNAUTHORIZED!!'});
  }
  next();
});

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];




function handleGetTypes(req, res){
  res.json(validTypes);
}

app.get('/types', handleGetTypes);



app.get('/pokemon', function handleGetPokemon(req, res) {
  let response = POKEDEX.pokemon;
  
 // filter our pokemon by name if name query param is present
  if (req.query.name) {
    response = response.filter(pokemon =>
      pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }
  
  // filter our pokemon by type if type query param is present
  if (req.query.type) {
    response = response.filter(pokemon =>
      pokemon.type.includes(req.query.type)
    );
  }
  
  res.json(response);
});

// const PORT = 8000;

// app.listen(PORT, ()=>{
//   console.log(`The port is open at http://localhost:${PORT} !!!`);
// });