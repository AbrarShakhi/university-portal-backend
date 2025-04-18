import bcrypt from "bcrypt";

import sql from "../../db/sql.js";

export default class StudentLogin {
  static async findById(id) {
    const result = await sql("SELECT * FROM student_login WHERE id = $1", [id]);

    if (result && result.rows) {
      return result.rows;
    } else {
      return undefined;
    }
  }

  static async updateById(id, { password, is_active }) {
    const result = await sql(
      "UPDATE student_login SET password = $1, is_active = $2 WHERE id = $3",
      [await bcrypt.hash(password, 10), is_active, id],
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static async findTokenById(id) {
    const result = await sql("SELECT * FROM student_token WHERE id = $1", [id]);

    if (result && result.rows) {
      return result.rows;
    }
    return undefined;
  }

  static async insertOpt(id, otp) {
    const result = sql(
      `INSERT INTO student_token 
              (created_date, expired_date, id, token) 
              VALUES 
              (NOW(), NOW() + INTERVAL '5 minutes', $1, $2)`,
      [id, otp],
    );
    if (result) {
      return true;
    }
    return false;
  }

  static async updateOpt(id, otp) {
    const result = sql(
      `UPDATE student_token 
              SET created_date = NOW(), expired_date = NOW() + INTERVAL '5 minutes', token = $2 
              WHERE id = $1`,
      [id, otp],
    );
    if (result) {
      return true;
    }
    return false;
  }
}
