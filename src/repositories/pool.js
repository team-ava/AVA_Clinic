import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: "./env/.env" });

// Configuração da conexão com o PostgreSQL
const pool = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT // Porta padrão do PostgreSQL
});

export default pool;