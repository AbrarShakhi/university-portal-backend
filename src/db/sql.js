import pool from "./connect.js";

export default async function sql(query_string, args) {
  try {
    const res = await pool.query(query_string, args);
    return res;
  } catch (err) {
    console.log(err.message);
    return undefined;
  }
}
