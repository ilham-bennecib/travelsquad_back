const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
const userControllers = require('../controllers/userControllers');
const validate = require('../validation/validator');
const schemaUser = require('../validation/schema/user.schema');
const schemaGroup = require('../validation/schema/group.schema');
const auth = require("../auth/auth");



//------------PAGES EN GET--------------


//page de tous les pays
router.get("/countries", controller.allCountries);
//page de tous les groupes d'un pays
router.get("/countries/:countryName", controller.allGroupsOfOneCountry);
//page d'un group
router.get("/countries/groups/:id", controller.oneGroup);
//page son propre profil
router.get("/profile", auth, controller.getYourprofile);//this route get informations from user and from experience
//page de profil d'un tiers
router.get("/profile/:id", auth, controller.getOneprofile);//this route get informations from user and from experience

//------------PAGES EN POST--------------


//page de creation d'un group
router.post("/countries/groups", validate(schemaGroup, 'body'), controller.addOneGroup);
//validation et ajout d'un nouveau user
router.post("/profile", validate(schemaUser, 'body'), controller.addNewUser);
//Login with JWT
router.post("/login", userControllers.login);
//s'inscrire à un groupe
router.post("/countries/groups/:groupId/add", auth, controller.addUserToGroup);
//supprimer un membre
router.post("/countries/groups/:groupId/remove/:memberId", auth, controller.removeMemberFromGroup);



//------------PAGES EN PATCH--------------
router.patch("/countries/groups/:id", controller.updateOneGroup);
router.patch("/profile/:id", controller.updateProfile);

//------------PAGES EN DELETE--------------
router.delete("/countries/groups/:id", controller.deleteGroup);
router.delete("/profile/:id", controller.deleteProfil);



module.exports = router;
