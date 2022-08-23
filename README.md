# minipent


## Install

set up an account at railway.app



### backend

create a strapi starter (will install a strapi back-end and postgresql db)

push your minipent fork

in the railway strapi app settings, set the base directory to `backend` 


go to https://yourappname/admin

create records in all the strapi fields or the build will fail

go to settings > roles > public and check `find`, `findOne` for each item

you'll need to redeploy the frontend to create the routes for any new pages you add



### frontend

set up a separate app on railway for the ui

set the base directory in settings to `frontend`

