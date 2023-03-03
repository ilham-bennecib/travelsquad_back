require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers/routers');


//authosriser les requêted u front
app.use(cors());
//body parser
app.use(express.json());

// Body parsing middlewares
app.use(express.urlencoded({ extended: true }));

// Nos Routes
app.use(router);

//gestion des erreru
app.use(({res})=>{
  const message = "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre url.";
  res.status(404).json({message});

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
