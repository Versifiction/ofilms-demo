## Le Non-tech
- bon dossier de conception.
- cahier des charges un peu léger (mais c'est pas dramatique)
- il FAUT faire des journaux de bord individuels.


## Les plus
- Déjà pas mal de choses en place.


## Les moins
- il faut séparer le routage de la logique. Donc implémenter des controllers !
- attention à la sécurité :
  - CORS mal configuré donc inutile. Astuce: mettez les noms de domaines dans un .env et utilisez process.env pour faire un CORS solide
  - pas d'ACL : tous les utilisateurs ont accès à tout.


## Sur quoi il faut se concentrer
- En prio, la sécurité : CORS, ACL et jetons CSRF dans les formulaires.
- Intégrer une API externe (par exemple géoloc) pour prouver votre maitrise du "N-services"



