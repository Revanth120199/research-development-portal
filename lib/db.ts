import "server-only"
import sql from "mssql"

const config: sql.config = {
  server: process.env.AZURE_SQL_SERVER!,
  database: process.env.AZURE_SQL_DATABASE!,
  authentication: {
    type: "default",
    options: {
      userName: process.env.AZURE_SQL_USER!,
      password: process.env.AZURE_SQL_PASSWORD!,
    },
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
    port: 1433,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
}

let pool: sql.ConnectionPool | null = null

export async function getDb(): Promise<sql.ConnectionPool> {
  if (pool?.connected) return pool
  pool = await new sql.ConnectionPool(config).connect()
  return pool
}

export { sql }
