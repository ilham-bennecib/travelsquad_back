
# TRAVELSQUAD API

Cette API a été créer lors du dernier mois de formation chez o'Clock, en équipe. J'étais chargé de coder l'API et le reste de l'équipe le front.

## But de ce projet en backend 
Utiliser les technos vu en formation :
-Node.Js                    -Sqitch                     
-Joi                        -Express.js
-Psql                       -Regex
-eslint                     -gestion d'erreur
-JWT                        
## But de ce projet en front
Ayant suivi la spécialisation backend, ce projet m'a également permis de maitriser les bases du framework REACT.

## les étapes : 
1-Conception, 1 semaine : MCD, MLD, MPD, cahier des charges et wirframe
2-Code pendant 2 semaines
3-Débug 1 semaine.

## FOnctionnalités du site lié à cette API : 
Proposer une alternative aux voyageurs qui ne souhate pas être seuls. Il peuvent s'inscrire à des groupes de voyage ou en créer un pour proposer aux membres du site une nouvelle expérience ; faire des rencontres dans le cadre d'un voyage.

## Les routes
|ROUTE|METHODE|QUELLE ENTITE|FONCTIONNALITE|
|----|:---------:|:---------:|:---------|
|/countries	|GET|	pays|	récupérer tous les pays|
|/countries/:countryName|	GET|	pays|	récupérer tous les groupes d'un pays selon son nom|
|/countries/groups/:id |GET|	groupe |	récupérer les infos d'un groupe|
|/countries/groups|	POST|	groupe|	créer un groupe|
|/countries/groups/:id |PATCH|	groupe |	modifier les élements d'un groupe quand on est créateur du groupe|
|/countries/groups/:id|DELETE |	groupe|	supprimer un groupe quand on est le créateur|
|/profile|	POST|	membre|	créer un user|
|/login|	POST|	membre|	se connecter au site|
|/profile/:id|	PATCH|	membre|	modifier son profil|
|/profile/:id|	DELETE|	membre|	supprimer son profil|
|/countries/groups/:groupId/add|	POST|	membre	|s'inscricire à un groupe|
|/countries/groups/:groupId/remove/:memberId |	POST |	membre |	supprimer un membre d'un groupe (pour les createur de groupe)|
|/profile/:id |	GET	|membre|	acceder au profil d'un tiers|
|/profile|	GET	|membre|	accéder à son propre profil|





