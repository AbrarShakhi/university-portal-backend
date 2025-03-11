import bcrypt from "bcrypt";

import pool from "../../db/connect.js";

export class StudentLogin {
  static async findById(id) {
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

  static async updateById(id, { password, is_active }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        "UPDATE student_login SET password = $1, is_active = $2 WHERE id = $3",
        [hashedPassword, is_active, id],
      );
      return result.command;
    } catch (error) {
      console.log(error.message);

      return undefined;
    }
  }
}
