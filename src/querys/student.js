import sql from "../../db/sql.js";

export default class Student {
  static async findById(id) {
    const result = await sql("SELECT * FROM student WHERE id = $1", [id]);

    if (result && result.rows) {
      return result.rows;
    } else {
      return undefined;
    }
  }
}
