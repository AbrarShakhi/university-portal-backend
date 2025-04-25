import bcrypt from "bcrypt";

import sql from "../db/sql.js";

export default class StudentLogin {
  static async findById(id) {
    const result = await sql("SELECT * FROM student_login WHERE id = $1", [id]);

    if (result) {
      return result.rows;
    } else {
      return undefined;
    }
  }

  static async updateById(id, password) {
    const result = await sql(
      "UPDATE student_login SET password = $1 WHERE id = $2",
      [await bcrypt.hash(password, 10), id],
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static async findTokenById(id) {
    const result = await sql("SELECT * FROM student_token WHERE id = $1", [id]);
    if (result) {
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

  static async deleteToken(id) {
    const result = sql(
      `DELETE FROM student_token 
              WHERE id = $1`,
      [id],
    );
    if (result) {
      return true;
    }
    return false;
  }

  static async incrementTryCount(id) {
    const result = sql(
      `UPDATE student_token 
              SET try_count = try_count + 1 
              WHERE id = $1`,
      [id],
    );
    if (result) {
      return true;
    }
    return false;
  }

  static async updateOtp(id, otp) {
    const result = sql(
      `UPDATE student_token 
              SET created_date = NOW(), expired_date = NOW() + INTERVAL '5 minutes', token = $1 
              WHERE id = $2`,
      [otp, id],
    );
    if (result) {
      return true;
    }
    return false;
  }

  static async insertStudent(id, password) {
    const result = await sql(
      `INSERT INTO student_login 
              (id, password) 
              VALUES 
              ($1, $2)`,
      [id, await bcrypt.hash(password, 10)],
    );

    if (result) {
      return true;
    }
    return false;
  }
}
