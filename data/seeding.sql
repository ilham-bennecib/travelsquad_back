-- SQLBook: Code

-- Verify catalyse:init on pg

BEGIN;
 TRUNCATE "user", "theme", "group", "experience", "user_group" RESTART IDENTITY;
INSERT INTO
  "user" (
        "firstName" ,
        "lastName" ,
        "email" ,
        "age" ,
        "image",
        "password" ,
        "content",
        "country_of_origin" ,
        "phone" ,
        "sex",
        "spoken_language"
  )
VALUES
  
  ( 'ilham','bennecib', 'ilham86@live.fr', '36', 'https://pixabay.com/fr/photos/femme-vietnamienne-en-plein-air-mode-7775904/','1234', 'je m''appelle ilham et je suis gentille)','france','0606060606', 'femme','français');

INSERT INTO
  "theme" ("name")
VALUES
  ('farniente'),
  ('culturel'),
  ('fiesta'),
  ('sport');
  

INSERT INTO
  "group" (
        "name" ,
        "start" ,
        "end",
        "language",
        "content" ,
        "max_members" ,
        "country" ,
        "city" ,
        "theme_id",
        "creator_id"
  )
VALUES
  ('fiesta à Paris','2023-03-11','2023-03-25','francais','nous allons faire la fête à paris',5,'france','paris',3,1 );

INSERT INTO
  "experience" ("year","country","title","content","user_id")
VALUES
  ('2019','japon','vissite de tokyo','visite en groupe de tokyo',1);


  INSERT INTO
  "user_group" ("user_id","group_id")
VALUES
  (1,1);



  

COMMIT;