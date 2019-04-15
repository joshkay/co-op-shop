const useBuild = () => (
   process.env.NODE_ENV === 'production' ||
   process.env.NODE_ENV === 'testing'
)

const getSettingByEnvironemnt = (build, src) =>
{
   if (useBuild())
   {
      return build;
   }
   return src;
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
         "build/src/entity/**/*.js",
         "src/entity/**/*.ts"
      )
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "subscribersDir": "src/subscriber"
   },
   "subscribers": [
      getSettingByEnvironemnt(
         "build/src/subscriber/**/*.js",
         "src/subscriber/**/*.ts"
      )
   ],
}

const config = useBuild() ?
{
   "name": "default",
   "migrations": [
      getSettingByEnvironemnt(
         "build/src/migration/**/*.js",
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
         "build/src/migration/**/*.js",
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
         "build/src/seed/**/*.js",
         "src/seed/**/*.ts"
      )
   ],
   "cli": {
      "migrationsDir": "src/seed"
   }
}]

module.exports = config