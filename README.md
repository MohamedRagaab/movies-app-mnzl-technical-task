# Movies App
* MNZL technical Challenge for the software engineer position.
* You can try it from here (Note that it might take sometime at the beginning): https://movies-app-mnzl-technical-task.onrender.com

<div align='center'>
<img height="350px" src="https://github.com/MohamedRagaab/movies-app-mnzl-technical-task/assets/38363762/ed6f3958-6acb-4ac9-9091-af101f2d49c9">
<hr/>
</div>

## Languages and frameworks 📑
* Node.js
* React.js
* Postgresql
* Typescript
## Features 🥇
* Easy discover, search, filter and add movies to your favorite list.
## Cloning the repo and starting the app
* clone the repository and open the project in any IDE
``` bash
git clone https://github.com/MohamedRagaab/movies-app-mnzl-technical-task.git
cd movies-app-mnzl-technical-task
```
* You can install docker desktop then run the following command to start the whole app and then open: http://localhost
``` bash
docker compose up
```
* or you can run every service manually
<br>
BE:
``` bash
cd /BE
npm install
npm run build
npm run start
```

FE:
``` bash
cd /FE
npm install
npm run start
```
* For the database, I created a Postgresql db on Render so you don't have to deal with this part. it will connect to it directly. have a look at the DB design:
<div align='center'>
<img height="350px" src="https://github.com/MohamedRagaab/movies-app-mnzl-technical-task/assets/38363762/9a384946-ed1b-48d3-b5d3-5e7bebd56e85">
<hr/>
</div>

## Usage 🚀
* Here is the list of the RESTful APIs
  - Users:
 
    - Login User:
        ``` bash
        POST /users/login
        ```
    - Register User:
        ``` bash
        POST /users 
        ```
    - Find User:
        ``` bash
        PUT /users/:id
        ```

  - Favorites:
 
    - Add to Favorites:
        ``` bash
        POST favorites/add
        ```
    - Remove from favorites:
        ``` bash
        GET /favorites/remove
        ```
    - List Favorites:
        ``` bash
        GET /favorites
        ```

## Task Checklist :white_check_mark:
- [x] Using themoviedb for building CRUD app
- [x] Use Postgresql for data persistence.
- [x] Frontend is built using react.js
- [x] Server built using node.js
- [x] Usig git version control
- [x] Deploy the app on a hosted service

