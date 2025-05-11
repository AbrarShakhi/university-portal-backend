import database from "../db/database.js";

export default class Student {
  static async findById(id) {
    const result = await database.query("SELECT * FROM student WHERE id = $1", [
      id,
    ]);

    if (result) {
      return result.rows;
    } else {
      return undefined;
    }
  }
}
