import pool from "../../db/connect.js";

export class stdLoginMdl {
  static async GetFromTest() {
    try {
      const query = {
        text: `SELECT * FROM test`,
      };
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      return undefined;
    }
  }
}
