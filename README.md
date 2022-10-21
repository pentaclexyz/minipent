## create new project in railway

create new - minipent-projectName-ui

create new - minipent-projectName


link each to minipent github repo and set settings to /frontend or /backend

create new postgres db



### get a database from the master database

`$ PGPASSWORD=00000000000000 pg_dump -h containers-us-west-81.railway.app -U postgres -p 9999 -d railway > minipent-04.sql`



### connect to railway db and drop the public schema

`$ PGPASSWORD=00000000000000 psql -h containers-us-west-92.railway.app -U postgres -p 7777 -d railway`

`$ DROP SCHEMA public CASCADE;`

`$ CREATE SCHEMA public;`



### import dumpfile to railway

navigate to minipent-db-backups dir

`$ PGPASSWORD=00000000000000 psql -h containers-us-west-92.railway.app -U postgres -p 7777 -d railway < minipent-04.sql`



### and locally if you want local

`$ createdb mp-local-04`

`$ mp-local-04 < minipent-04.sql`




### deploy backend

`$ railway link`

select repo

`$ railway up`

select be instance to deploy




### deploy frontend

`$ railway link`

select repo

`$ railway up`

select fe instance to deploy
