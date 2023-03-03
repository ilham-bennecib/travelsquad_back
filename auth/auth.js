const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({message : "vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un à l'en-tête de la requête"});
  }
  const token = authorizationHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  req.userId = decodedToken.userId;
  next();

};

module.exports = verifyToken;

// , (error, decodedToken) => {

//   if (error) {
//     return res.status(401).json({message : "l'utilisateur n'est pas autorisé à accéeder aux ressources"});

//   }
//   const userId = decodedToken.userId;
//   if (req.body.userId && req.body.userId !== userId){
//     res.status(401).json({message : "l'identifiant de l'utilisateur est invalide"});
//   } else {
//     next();
//   }
// }
