module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('HOST', '127.0.0.1'),
      port: env.int('PORT', 5432),
      database: env('DATABASE', 'minipent'),
      ssl: env.bool(true),
    },
  },
});
