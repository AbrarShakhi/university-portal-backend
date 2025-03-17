import pool from "../../db/connect.js";

export default async function query(query_string, args) {
  try {
    return await pool.query(query_string, args);
  } catch (error) {
    console.log(error.message);
    return undefined;
  }
}
