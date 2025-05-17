import database from "../db/database.js";

export default class Options {
  static async get() {
    const sql = `
        SELECT * FROM options
    `;
    const result = await database.query(sql);
    if (result && result.rows.length > 0) {
      return result.rows[0];
    } else {
      return undefined;
    }
  }
}