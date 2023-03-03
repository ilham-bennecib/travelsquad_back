const dataMapper = require('../dataMapper/datamapper');
const countries = require('../data/countries.json');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');




const controller = {

  allCountries:  (req, res) => {
    try{
      res.json(countries);}
    catch(err){
      const message = "la liste des pays n'a pas pû être récupérée. Réessayez dans quelques instants.";
      res.statut(500).json({message, err});
    }
  },

  allGroupsOfOneCountry : async (req, res) => {
    const country = req.params.countryName;
    try{
      const allgroups = await dataMapper.getAllGroupsFromOneCountries(country);
      if(!allgroups[0]){
        const message = "ce pays n'a pas de groupe";
        return res.status(404).json({message});
      }
      res.json(allgroups);

    }catch(err){
      const message = "la liste des groupes de ce pays n'a pas pû être récupérée. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }
  },

  oneGroup : async (req, res) => {
    //ajouter les villes
    const id = parseInt(req.params.id, 10);
    try{
      const oneGroup = await dataMapper.getOneGroup(id);
      if(!oneGroup){
        const message = "cette escouade n'existe pas. Retournez à la liste des pays.";
        return res.status(404).json({message});
      }
      res.json(oneGroup);
    }catch(err){
      const message = "Cette escouade n'a pas pû être récupéré. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }
  },

  getYourprofile : async (req, res) => {
    // const id = parseInt(req.params.id, 10);
    const id = req.userId;

    try{
      const oneProfile = await dataMapper.getOneprofile(id);
      if(!oneProfile){
        const message = "cette personne n'existe pas. Retournez à la page d'acceuil.";
        return res.status(404).json({message});
      }
      res.json(oneProfile);
    }catch(err){
      const message = "Le profil de cette personne n'a pas pû être récupéré. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }
  },

  addOneGroup : async (req,res)=>{
    // récupérer les données de la query une à une grâce à une destructuration
    const {
      name,
      start,
      end,
      language,
      content ,
      country ,
      max_members,
      city ,
      theme_id,
    } = req.body;
    //le createur est passé à 1 pour laisser les front tester le code sans l'authentification
    const creator_id = "1";

    try {
      const newGroup = await dataMapper.createOneGroup({
        // Envoyer les données string à la db en castant les Integer
        name,
        start,
        end,
        language,
        content ,
        country ,
        max_members : parseInt(max_members, 10),
        city ,
        theme_id : parseInt(theme_id, 10),
        creator_id : parseInt(creator_id, 10),
      });
      // Return the object
      res.json(newGroup);

    } catch (err) {
      const message = "L'enregistrement de ce groupe n'a pas pû etre réaliser. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }

  },

  addNewUser : async (req,res)=>{
    const {
      firstName ,
      lastName ,
      email,
      age,
      image,
      password,
      passwordConfirm,
      content,
      country_of_origin ,
      phone,
      sex,
      spoken_language
    }=req.body;
    //verify that user enter required datas
    if(!firstName ||!lastName ||!email ||!age ||!password ||!passwordConfirm ||!phone ||!sex){
      return res.status(404).json({errorMessage : "veuillez remplir tous les champs"});
    }

    //verify that email format is correct
    if(!emailValidator.validate(email)){
      return res.status(404).json({errorMessage : "veuillez entrez une adresse mail valide"});
    }

    //verify that email is not already in the db

    try {

      const alreadyExistingUser = await dataMapper.getuserFromEmail(email);

      if(alreadyExistingUser){
        return res.status(404).json({errorMessage : "ce mail existe déjà"});
      }

    } catch (err) {
      const message = "la vérification du mail n'a pas pu être réalisée. Réessayez dans quelques instants.";
      return res.status(500).json({message, err});
    }
    //verify that passwords match

    if(password !== passwordConfirm){
      const message = "les mots de passe ne correspondent pas";
      return res.status(404).json({message});
    }

    //hash the password using bcrypt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedpassword = await bcrypt.hash(password, salt);

    //add the user to the db
    try {

      await dataMapper.createOneUser({
      // Envoyer les données string à la db en castant les Integer
        firstName ,
        lastName ,
        email,
        age : parseInt(age, 10),
        image,
        password : hashedpassword,
        content,
        country_of_origin ,
        phone : parseInt(phone, 10),
        sex,
        spoken_language
      });
      res.status(200).json({message: "votre inscription est réussie"});

    } catch (err) {
      const message = "L'enregistrement de votre profil n'a pas pû etre réaliser. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }
  },

  updateOneGroup: async (req, res) => {
  // on recupère l'id de l'objet à modifier
    const id = parseInt(req.params.id, 10);
    try {
      // on récupère tous les champs de l'objet
      const checkObject = await dataMapper.getOneGroup(id);
      if (!checkObject) {
        throw new Error('sorry, this is not existing in my data');
      }
      const updatedGroup = await dataMapper.updateOneGroup({ ...req.body, id });
      res.json(updatedGroup);

    } catch (err) {
      const message = "la modification de ce groupe n'a pas pû etre réaliser. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }
  },

  updateProfile: async (req, res) => {
  // on recupère l'id de l'objet à modifier
    const id = parseInt(req.params.id, 10);
    try {
      // on récupère tous les champs de l'objet
      const checkObject = await dataMapper.getOneprofile(id);
      if (!checkObject) {
        throw new Error('sorry, this is not existing in my data');
      }
      const updatedProfil = await dataMapper.updateOneProfile({ ...req.body, id });
      res.json(updatedProfil);

    } catch (err) {
      const message = "la modification de ce profil n'a pas pû etre réaliser. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }
  },


  deleteGroup : async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deletedGroup = await dataMapper.deleteOneGroup(id);
    res.json(deletedGroup);
  },

  deleteProfil : async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deletedUser = await dataMapper.deleteOneUser(id);
    res.json(deletedUser);
  },

  getOneprofile : async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try{
      const oneProfile = await dataMapper.getOneprofile(id);
      if(!oneProfile){
        const message = "cette personne n'existe pas. Retournez à la page d'acceuil.";
        return res.status(404).json({message});
      }
      res.json(oneProfile);
    }catch(err){
      const message = "Le profil de cette personne n'a pas pû être récupéré. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }
  },
  addUserToGroup : async (req, res) => {
    const groupId = parseInt(req.params.groupId, 10);
    const userId = req.userId;
    try{
      const checkGroup= await dataMapper.getOneGroup(groupId);
      if (!checkGroup) {
        return res.status(404).json({message :'cette escouade n\'existe pas. Retournez à la liste des pays.'});
      }
      const checkUser = await dataMapper.checkUserInGroup(userId, groupId);
      if (checkUser) {
        return res.status(404).json({message :'vous êtes déjà inscrit à cette escouade. Retournez à la liste des pays.'});
      }
      await dataMapper.addOneUserToGroup(userId,groupId);
      res.status(200).json({message : 'votre inscription est réussie'});

    }catch(err){
      const message = "votre inscription na pas pû être réalisée. Réessayez dans quelques instants.";
      res.status(500).json({message, err});
    }
  },
  removeMemberFromGroup : async (req, res) => {
    const groupId = parseInt(req.params.groupId, 10);
    const membertoRemoveId = parseInt(req.params.memberId,10);
    const creatorId = req.userId;
    try {
      const checkUser = await dataMapper.checkUserInGroup(membertoRemoveId);
      if (!checkUser) {
        return res.status(404).json({message :'cette personne n\'est pas inscrite dans le groupe'});
      }
      const checkGroup= await dataMapper.getOneGroup(groupId);
      if(creatorId === checkGroup.creator_id){
        await dataMapper.deleteUserFromGroup(membertoRemoveId, groupId );

      }
      res.json({message : 'Ce membre a été supprimé'});

    } catch (err) {
      const message = "la suppression de ce membre n'a pas pu être réalisée. Reessayez dans quelques instants.";

      res.status(500).json({message, err});
    }

  },

};
module.exports = controller;
