# Projet de fin de module NoSQL

Pour ce projet, vous allez créer une petite API qui va servir de backend à une plateforme d'apprentissage en ligne. J'ai préparé la structure du projet avec une organisation professionnelle du code, comme vous pouvez le constater dans ce dépôt Github.


## Instructions de configuration

Suivez ces étapes pour configurer le projet localement :

### 1. Cloner le dépôt

Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/AbderrahimeEl/learning-platform-nosql.git
cd learning-platform-nosql
```

### 2. Installer les dépendances

Exécutez la commande suivante pour installer toutes les dépendances requises :

```bash
npm install
```

### 3. Lancer MongoDB et Redis avec Docker (optionnel)

Si vous souhaitez utiliser Docker pour MongoDB et Redis, assurez-vous d'avoir [Docker](https://www.docker.com/) installé, puis exécutez la commande suivante :

```bash
docker-compose up
```

Cela démarrera les conteneurs MongoDB et Redis. L'application pourra se connecter à ces services tant que les bonnes variables d'environnement sont définies dans le fichier `.env`.

- **MongoDB** sera accessible à `mongodb://localhost:27017`.
- **Redis** sera accessible à `redis://localhost:6379`.

Si vous n'utilisez pas Docker pour MongoDB ou Redis, assurez-vous que ces services sont en cours d'exécution localement.

### 4. Démarrer l'application

Une fois que les services nécessaires sont lancés, vous pouvez démarrer le serveur API avec la commande suivante :

```bash
npm start
```

Par défaut, l'application sera accessible à `http://localhost:3000`.


---

## Structure du projet

La structure du projet est la suivante :

```
.
├── docker-compose.yml     # Configuration Docker Compose pour lancer l'app
├── package.json           # Dépendances et scripts Node.js
├── package-lock.json      # Versions verrouillées des dépendances
├── README.md              # Ce fichier README
└── src                    # Code source de l'application
    ├── app.js             # Point d'entrée principal de l'app
    ├── config
    │   ├── db.js          # Configuration de la base de données
    │   └── env.js         # Variables d'environnement
    ├── controllers
    │   ├── courseController.js  # Logique de l'API pour les cours
    │   └── studentController.js # Logique de l'API pour les étudiants
    ├── routes
    │   ├── courseRoutes.js     # Routes de l'API pour les cours
    │   └── studentRoutes.js    # Routes de l'API pour les étudiants
    └── services
        ├── mongoService.js     # Fonctions de service MongoDB
        └── redisService.js     # Fonctions de service Redis
```

---

## Documentation des points de terminaison de l'API

### Cours

- **POST /api/courses/create** : Créer un nouveau cours.
- **GET /api/courses/stats** : Obtenir les statistiques des cours.
- **GET /api/courses/:id** : Obtenir les détails d'un cours spécifique.
- **GET /api/courses** : Obtenir la liste de tous les cours.
- **PUT /api/courses/:id** : Mettre à jour un cours spécifique.
- **DELETE /api/courses/:id** : Supprimer un cours spécifique.

### Étudiants

- **POST /api/students/create** : Créer un nouvel étudiant.
- **GET /api/students/:id** : Obtenir les détails d'un étudiant spécifique.
- **GET /api/students** : Obtenir la liste de tous les étudiants.
- **PUT /api/students/:id** : Mettre à jour un étudiant spécifique.
- **DELETE /api/students/:id** : Supprimer un étudiant spécifique.
- **POST /api/students/:id/enroll** : Inscrire un étudiant à un cours.
- **GET /api/students/:id/courses** : Obtenir les cours auxquels un étudiant est inscrit.

## Questions :

#### `env.js`  

**Pourquoi est-il important de valider les variables d'environnement au démarrage ?**  
Valider les variables d'environnement est crucial pour éviter les erreurs dues à des configurations incomplètes ou incorrectes. Cela garantit également la sécurité des données sensibles, facilite le déploiement sans accroc, surtout dans des environnements CI/CD, et simplifie le débogage en cas de problème.  

**Que se passe-t-il si une variable requise est manquante ?**  
Si une variable essentielle manque, l'application doit s'arrêter immédiatement avec un message d'erreur clair. Cela permet d'identifier et de résoudre rapidement les problèmes avant qu'ils n'affectent le fonctionnement.

#### `db.js`  

**Pourquoi créer un module séparé pour les connexions aux bases de données ?**  
Créer un module dédié pour les connexions centralise la logique, simplifie la maintenance et permet une réutilisation facile dans toute l'application. Cela réduit les duplications et améliore la lisibilité du code.  

**Comment gérer proprement la fermeture des connexions ?**  
Pour une fermeture propre des connexions, utilisez des méthodes spécifiques comme `mongoClient.close()` pour MongoDB ou `redisClient.quit()` pour Redis. Implémentez également un gestionnaire d'événements, tel que `process.on('exit')`, pour vous assurer que les ressources sont libérées avant l'arrêt de l'application.

#### `mongoService.js`  

**Pourquoi créer des services séparés ?**  
Créer des services séparés améliore l'organisation et la modularité en isolant la logique métier. Cela permet une réutilisation efficace du code, facilite les tests unitaires et rend l'application plus maintenable et évolutive. Ces services assurent une structure claire et une meilleure séparation des responsabilités.

#### `courseController.js`  

**Quelle est la différence entre un contrôleur et une route ?**  
Une route associe une URL à une action spécifique (GET, POST, etc.), tandis qu’un contrôleur contient la logique métier liée à ces actions. Les contrôleurs permettent de centraliser cette logique, séparant ainsi la définition des routes de leur traitement.  

**Pourquoi séparer la logique métier des routes ?**  
Séparer la logique métier des routes rend le code plus lisible et organisé. Cela permet de réutiliser la logique dans d'autres contextes, comme les tests, et facilite les modifications sans affecter les routes. Cette séparation respecte également le principe de responsabilité unique, rendant le code plus professionnel et maintenable.

#### `courseRoutes.js`  

**Pourquoi séparer les routes dans différents fichiers ?**  
Séparer les routes par fonctionnalité améliore la lisibilité et facilite la maintenance. Chaque fichier gère les routes d’un domaine spécifique (ex. : `coursesRoutes.js`) ce qui rend les modifications ou ajouts plus simples. Cette organisation modulaire contribue à rendre le projet plus évolutif.  

**Comment organiser les routes de manière cohérente ?**  
Pour une organisation cohérente, regroupez les routes par fonctionnalité ou ressource dans un dossier dédié (`/routes`), centralisez leur importation dans un fichier comme `index.js` et suivez les conventions REST. Documentez vos routes pour plus de clarté, en utilisant des commentaires ou des outils comme Swagger.

#### `app.js`  

**Comment organiser le point d'entrée de l'application ?**  
Le point d’entrée doit être simple et modulaire. Le fichier principal (souvent `index.js` ou `app.js`) configure les éléments de base (routes, middleware, connexions DB) et délègue les responsabilités aux modules appropriés. Cela garantit une meilleure lisibilité et facilite la gestion à mesure que l’application évolue.  

**Quelle est la meilleure façon de gérer le démarrage de l'application ?**  
Lors du démarrage, initialisez les composants dans un ordre logique (DB, services, etc.), gérez les erreurs d’initialisation pour éviter un lancement incorrect, et préparez l’application à une fermeture propre (`SIGTERM`, `SIGINT`). Une bonne gestion du démarrage assure la stabilité et l’évolutivité.

#### `redisService.js`  

**Comment gérer efficacement le cache avec Redis ?**  
Pour optimiser l’utilisation de Redis, définissez des TTL pour limiter les données obsolètes, adoptez des stratégies comme *cache-aside* ou *write-through*, et synchronisez le cache avec la base de données. Surveillez les performances avec des outils de monitoring pour maintenir un bon taux de hit/miss.  

**Quelles sont les bonnes pratiques pour les clés Redis ?**  
Adoptez un système de nommage clair et structuré, comme `type:id:attribut` (ex. : `user:123:profile`). Gardez les clés courtes mais descriptives, utilisez des séparateurs standards (`:`), et incluez des informations sur le type de données dans le nom. Cela facilite l’organisation et l’accès rapide aux données.
