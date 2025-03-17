import query from "../../helpers/query.js";

export default class Student {
  static async findById(id) {
    const result = await query("SELECT * FROM student WHERE id = $1", [id]);

    if (result && result.rows.length == 1) {
      return result.rows[0];
    } else {
      return undefined;
    }
  }
}
