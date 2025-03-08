import pool from "../../db/connect.js";

export class stdLoginMdl {
  static async GetFromTest() {
    const query = `SELECT * FROM student`;
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      return undefined;
    }
  }
}
