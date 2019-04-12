const isProduction = () =>
{
   return process.env.NODE_ENV === 'production';
}

const getSettingByEnvironemnt = (prod, dev) =>
{
   if (isProduction())
   {
      return prod;
   }
   return dev;
}

const common = {
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "postgres",
   "password": null,
   "database": "co-op-shop",
   "synchronize": true,
   "logging": false,
   "entities": [
      getSettingByEnvironemnt(
         "build/entity/**/*.js",
         "src/entity/**/*.ts"
      )
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "subscribersDir": "src/subscriber"
   },
   "subscribers": [
      getSettingByEnvironemnt(
         "build/subscriber/**/*.js",
         "src/subscriber/**/*.ts"
      )
   ],
}

const config = isProduction() ?
{
   "name": "default",
   "migrations": [
      getSettingByEnvironemnt(
         "build/migration/**/*.js",
         "src/migration/**/*.ts"
      )
   ],
   "cli": {
      "migrationsDir": "src/migration"
   },
   ...common
}
:
[{
   "name": "default",
   "migrations": [
      getSettingByEnvironemnt(
         "build/migration/**/*.js",
         "src/migration/**/*.ts"
      )
   ],
   "cli": {
      "migrationsDir": "src/migration"
   },
   ...common
},
{
   "name": "test",
   "migrations": [
      getSettingByEnvironemnt(
         "build/seed/**/*.js",
         "src/seed/**/*.ts"
      )
   ],
   "cli": {
      "migrationsDir": "src/seed"
   }
}]

module.exports = config