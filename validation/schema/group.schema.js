const Joi = require('joi');

const todayDate = new Date();


const schemaGroup = Joi.object().keys({

  name : Joi.string()
    .min(2)
    .max(64)
    .pattern(/^[a-zA-ZÀ-ÿ0-9 '-]+$/),

  start : Joi.date()
    .min(todayDate),

  end : Joi.date() ,

  language : Joi.string()
    .min(3)
    .max(64),


  content : Joi.string()
    .min(10),

  max_members : Joi.number()
    .min(2)
    .max(10),

  country : Joi.string()
    .min(2)
    .max(64)
    .pattern(/^[a-zA-ZÀ-ÿ '-]+$/),

  city: Joi.string()
    .min(2)
    .max(64)
    .pattern(/^[a-zA-ZÀ-ÿ '-]+$/),

  theme_id : Joi.number(),

  creator_id : Joi.number(),

});

module.exports = schemaGroup;

