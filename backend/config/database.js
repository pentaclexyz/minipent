module.exports = ({ env }) => ({
  settings: {
    forceMigration: false,
  },
  connection: {
    client: "postgres",
    connection: {
      host: env('PGHOST', '127.0.0.1'),
      port: env.int('PGPORT', 5432),
      database: env('PGDATABASE', 'mp-local-04'),
      ssl: env.bool(true),
    },
  },
});
