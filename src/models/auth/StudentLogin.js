import pool from "../../db/connect.js";

export class StudentLogin {
  static async findOne({ id }) {
    try {
      const result = await pool.query(
        "SELECT * FROM student_login WHERE id = $1",
        [id],
      );

      if (result && result.rows.length == 1) return result.rows[0];
      else undefined;
    } catch (error) {
      return undefined;
    }
  }
}
