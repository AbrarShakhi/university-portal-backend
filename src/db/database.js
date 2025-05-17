import dotenv from "dotenv";
import pkg from "pg";

class Database {
  #pool = undefined;
  #config = undefined;

  constructor() {
    dotenv.config();

    const { Pool } = pkg;

    this.#loadDbConfig();

    try {
      this.#pool = new Pool(this.#config);
    } catch (error) {
      console.log("Failed create Postgres pool", error);
      console.log("Database config:", this.#config);
      throw error;
    }
  }

  #loadDbConfig() {
    this.#config = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };
  }

  async connect() {
    try {
      console.log("Attempting to connect to database.....");
      await this.#pool.connect();
      console.log("Connected to PostgreSQL database");
    } catch (error) {
      console.error("Failed to connect to PostgreSQL database", error.message);
      console.log("Database config:", this.#config);
      throw error;
    }
  }

  async end() {
    await this.#pool.end();
  }

  async query(sql, params) {
    try {
      const result = await this.#pool.query(sql, params);
      return result;
    } catch (error) {
      console.log(sql);
      console.log(params);
      console.error("Query error", error.message);
      // throw error;
    }
  }
}

const database = new Database();
export default database;
