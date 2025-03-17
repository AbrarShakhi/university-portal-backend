import bcrypt from "bcrypt";

import query from "../../helpers/query.js";

export default class StudentLogin {
  static async findById(id) {
    const result = await query("SELECT * FROM student_login WHERE id = $1", [
      id,
    ]);

    if (result && result.rows.length == 1) {
      return result.rows[0];
    } else {
      return undefined;
    }
  }

  static async updateById(id, { password, is_active }) {
    const result = await query(
      "UPDATE student_login SET password = $1, is_active = $2 WHERE id = $3",
      [await bcrypt.hash(password, 10), is_active, id],
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
