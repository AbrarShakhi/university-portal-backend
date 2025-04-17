import pool from "./connect.js";

export default async function sql(query_string, args) {
  pool
    .query(query_string, args)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error("Error executing query", err.stack);
      return undefined;
    });
}
