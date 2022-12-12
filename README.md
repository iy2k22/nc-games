## Environment Variables
If you're planning on running this locally, you'll want to create 2 `.env` files. This will contain the `PGDATABASE` environment variable, which will be used to connect to the database. One will be called `.env.test` and will be used when testing with jest. It will contain the following:
```
PGDATABASE=nc_games_test
```
The other file will be called `.env.development` and will contain the following:
```
PGDATABASE=nc_games
```
These two files must be in the root of the project.