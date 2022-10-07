# minipent


## Install

set up an account at railway.app



### backend

create a strapi starter (will install a strapi back-end and postgresql db)
new project > type strapi to select and deploy template

you will need to create some variables
for JWT secret, app keys and api token salt, use generate.js to generate random strings
you will need to set up a cloudinary account for image hosting for now until we sort out local image storage (soon)

in the railway strapi app settings, set root directory to `backend`
yourapp > settings > service > general > root directory

push your minipent fork

the front end build will fail

go to
my-railway-backend.railway.app/admin

create your strapi account - carefully note your password

change the permissions to find and findOne for each api endpoint in:
settings > users and permissions plugin > roles > public

create at least one record in all the strapi collection and single types 
(eg homepage, global, events, projects etc) or the frontend build will fail

you'll need to redeploy back and frontend to create the routes for any new pages you add

in project root:

`$ railway link` [select backend]
`$ railway up` deploys backend




### frontend

set up a separate app on railway for the ui

set the base directory in settings to `frontend`

in project root:

`$ railway link` [select frontend]
`$ railway up` deploys frontend

