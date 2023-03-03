//Require JWT
const jwt = require("jsonwebtoken");
const dataMapper = require('../dataMapper/datamapper');
const bcrypt = require('bcrypt');



// JWT authentificator verification / create token
const userControllers = {

  login: async (req, res) => {
    try{
      const {email, password} = req.body;
      //verify if the email is in db
      const alreadyExistingUser = await dataMapper.getuserFromEmail(email);

      if(!alreadyExistingUser){
        return res.status(404).json({message : "mail ou mot de passe incorrect"});
      }
      //verify if the password is in db
      const match = await bcrypt.compare(password, alreadyExistingUser.password);
      if(!match){
        return res.status(404).json({message : "mail ou mot de passe incorrect"});
      }
      //generate jwt token
      if(email === alreadyExistingUser.email && match){
        const id = alreadyExistingUser.id;
        const token = jwt.sign(
          {userId : id},
          process.env.TOKEN_KEY,
          {expiresIn : "24h"}
        );
        const message = "Vous êtes connecté";

        res.status(200).json({message, alreadyExistingUser, token });
      }
    }catch(err){
      res.status(500).json({ message: "l'authentification n'a pas pu être réalisée. réessayez ultérieurement"});
    }
  }
};
module.exports = userControllers;
