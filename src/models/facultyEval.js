import database from "../db/database.js";

export default class FacultyEval {
  static async list(id, year, season) {
    const sql = `
      SELECT DISTINCT t.faculty_short_id 
      FROM teaches t
      INNER JOIN takes tk ON t.section_no = tk.section_no 
        AND t.course_id = tk.course_id 
        AND t.year = tk.year 
        AND t.season = tk.season
      WHERE tk.id = $1 
        AND tk.year = $2 
        AND tk.season = $3
        AND NOT EXISTS (
          SELECT 1 
          FROM faculty_eval fe 
          WHERE fe.faculty_short_id = t.faculty_short_id
            AND fe.id = tk.id
            AND fe.year = tk.year
            AND fe.season = tk.season
        )`;
    const result = await database.query(sql, [id, year, season]);
    if (result) {
      return result.rows;
    } else {
      return undefined;
    }
  }

  static async evaluate(id, faculty_short_id, rating, year, season) {
    const sql = `
      INSERT INTO faculty_eval (faculty_short_id, rating, id, year, season)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const result = await database.query(sql, [faculty_short_id, rating, id, year, season]);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
