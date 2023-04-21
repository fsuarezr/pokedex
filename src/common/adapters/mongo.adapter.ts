export const getMongoDBConnection = () => {
  console.log(process.env.MONGO_CONN)

  const mongoConn = process.env.MONGO_CONN

  const mongoUser = process.env.MONGO_USER

  const mongoPassword = process.env.MONGO_PASSWORD

  const mongoHost = process.env.MONGO_HOST

  const mongoDatabase = process.env.MONGO_DATABASE

  const connString =
    mongoConn === `local`
      ? `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}`
      : `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoDatabase}?retryWrites=true&w=majority`

  return connString
}
