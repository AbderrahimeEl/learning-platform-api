# Projet de fin de module NoSQL

API backend pour une plateforme d’apprentissage en ligne, incluant la gestion des cours, étudiants
et formateurs, ainsi que l’inscription, les mises à jour et les statistiques. 

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
