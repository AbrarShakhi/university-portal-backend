import database from "../db/database.js";

export default class FacultyEval {
  static async list(id, year, season) {
    const sql = `
    `;
    const result = await database.query(sql, [id, year, season]);
    if (result && result.rows.length > 0) {
      return result.rows[0];
    } else {
      return undefined;
    }
  }
}