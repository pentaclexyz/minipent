# minipent


## Install

set up an account at railway.app



### backend

create a strapi starter (will install a strapi back-end and postgresql db)

push your minipent fork

in the railway strapi app settings, set the base directory to `backend` 


go to https://your-railway-app/admin

create your strapi account - note down your password in case you forget to set the forgotten password function later

create at least one record in all the strapi pages (eg homepage, global nav, events, projects etc) or the build will fail

go to settings > roles > public and check `find`, `findOne` for each item so your data displays on the frontend

you'll need to redeploy to create the routes for any new pages you add

in your command line:

`$ railway link` (select the back-end)

`$ railway up` runs your deploy



### frontend

set up a separate app on railway for the ui

set the base directory in settings to `frontend`

in your command line:

`$ railway link` (select the front-end)

`$ railway up` runs your deploy

