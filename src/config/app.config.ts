export const EnvConfiguration = () => ({
  /**
   * API configs
   */
  api: {
    enviroment: process.env.NODE_ENV || `dev`,
    port: process.env.APP_PORT || 3000,
    prefix: process.env.API_PREFIX,
  },

  pagination: {
    limit: process.env.LIMIT_PAGINATION || 15,
    offset: process.env.OFFSET_PAGINATION || 15,
  },

  /**
   * Environment External Services
   */
  services: {
    mongoDB: {
      mongoConn: process.env.MONGODB_CONN || `local`,
      mongoUser: process.env.MONGO_USER,
      mongoPassword: process.env.MONGO_PASSWORD,
      mongoHost: process.env.MONGO_HOST,
      mongoDatabase: process.env.MONGO_DATABASE,
    },
  },
})
