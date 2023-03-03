const client = require('../data/database');


const dataMapper = {

  async  getAllGroupsFromOneCountries(country) {
    const query = {
      text: `SELECT * FROM "group" where "country" = $1`,
      values: [country],

    };
    const result = await client.query(query);
    return result.rows;
  },

  async getOneGroup(id){
    const query = {
      text : `SELECT * FROM "group" 
      where "group"."id" = $1`,

      values: [id]

    };
    const result = await client.query(query);
    return result.rows[0];

  },

  async getOneprofile(id){

    const query = {
      text : `SELECT  "user".*, "experience"."year", "experience"."title", "experience"."country" FROM "user"
        FULL JOIN "experience" ON "user"."id"="experience"."user_id"  
             where "user"."id" = $1`,
      values : [id]
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  async createOneGroup(obj){
    const query = {
      text:
      `WITH new_group AS (
        INSERT INTO "group"
          ("name" ,
          "start" ,
          "end",
          "language",
          "content" ,
          "max_members" ,
          "country" ,
          "city" ,
          "theme_id",
          "creator_id" )
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
        )
      INSERT INTO "user_group" 
        ("user_id", "group_id")
	    VALUES ($10, 
	      (SELECT id FROM new_group));`,

      values: [
        obj.name,
        obj.start,
        obj.end,
        obj.language,
        obj.content,
        obj.max_members,
        obj.country,
        obj.city,
        obj.theme_id,
        obj.creator_id,
      ],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  async createOneUser (obj){

    const query = {
      text: `INSERT INTO "user"
      ("firstName" ,
        "lastName" ,
        "email" ,
        "age" ,
        "image",
        "password" ,
        "content",
        "country_of_origin" ,
        "phone" ,
        "sex",
        "spoken_language" )
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)`,

      values: [
        obj.firstName,
        obj.lastName,
        obj.email,
        obj.age,
        'null',
        obj.password,
        obj.content,
        obj.country_of_origin,
        obj.phone,
        obj.sex,
        obj.spoken_language,
      ],
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  async updateOneGroup(obj) {
    const query = {
      text: `UPDATE "group"
        SET
        "name" = $1,
        "start"= $2,
        "end"= $3,
        "language"= $4,
        "content"= $5,
        "max_members"= $6,
        "country"= $7,
        "city"= $8,
        "theme_id"= $9,
        "creator_id" = $10,
        "updated_at" = now()

        where "id" = $11

        RETURNING *`

      ,

      values: [
        obj.name,
        obj.start,
        obj.end,
        obj.language,
        obj.content,
        obj.max_members,
        obj.country,
        obj.city,
        obj.theme_id,
        obj.creator_id,
        obj.id]
    };

    const result = await client.query(query);
    // Return the result
    return result.rows[0];
  },

  async updateOneProfile(obj) {

    const query = {
      text: `UPDATE "user"
        SET
          "firstName" = $1,
          "lastName" = $2,
          "email" = $3,
          "age" = $4,
          "image" = $5,
          "password" = $6,
          "content" = $7,
          "country_of_origin" = $8,
          "phone"  = $9,
          "sex" = $10,
          "spoken_language" = $11,
          "updated_at" = now()

        where "id" = $12

        RETURNING *`

      ,

      values: [
        obj.firstName,
        obj.lastName,
        obj.email,
        obj.age,
        obj.image,
        obj.password,
        obj.content,
        obj.country_of_origin,
        obj.phone,
        obj.sex,
        obj.spoken_language,
        obj.id]
    };

    const result = await client.query(query);

    // Return the result
    return result.rows[0];
  },

  async deleteOneGroup (id){

    const query = {
      text : 'DELETE FROM "group" WHERE "id" = $1',
      values : [id]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  async deleteOneUser (id){
    const query = {
      text : 'DELETE FROM "user" WHERE "id" = $1',
      values : [id]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  async getuserFromEmail (email){

    const query = {
      text : 'SELECT * FROM "user" WHERE "email" = $1',
      values : [email]
    };
    const result = await client.query(query);
    return result.rows[0];


  },

  async addOneUserToGroup(id, group_id){
    const query = {
      text : `INSERT INTO "user_group"
      ("user_id", "group_id")

      VALUES
        ($1, $2)`,

      values: [
        id,
        group_id
      ],
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  async checkUserInGroup (userId, groupId){
    const query = {
      text : 'SELECT * FROM "user_group" WHERE "user_id" = $1 AND "group_id" = $2',

      values : [userId, groupId]
    };
    const result = await client.query(query);
    return result.rows[0];

  },

  async deleteUserFromGroup (userToRemoveID, groupId){
    const query = {
      text : 'DELETE FROM "user_group" WHERE "user_id" = $1 AND "group_id"=$2' ,
      values : [userToRemoveID, groupId]
    };
    const result = await client.query(query);
    return result.rows[0];
  }
};
module.exports = dataMapper;
