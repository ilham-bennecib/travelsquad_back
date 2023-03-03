const Joi = require('joi');

const generalRulesNames = Joi.string()//de type string
  .min(2)
  .required()//donnée obligatoire
  .max(64)
  .pattern(/^[a-zA-ZÀ-ÿ '-]+$/);//




const userSchema = Joi.object({

  firstName : generalRulesNames,

  lastName:generalRulesNames,

  email : Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } })
    .required(),

  age: Joi.number()
    .min(18),

  image :Joi.string(),

  password:Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  passwordConfirm : Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  content :Joi.string()
    .min(10),
  country_of_origin :generalRulesNames,

  phone : Joi.string()
    .pattern((/^[0-9-]+$/)),

  sex : Joi.string()
    .length(5),

  spoken_language :generalRulesNames,

})
;

module.exports = userSchema;

