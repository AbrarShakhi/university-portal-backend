import database from "../db/database.js";

export default class GradeReport {
  static async report(id) {
    const sql = `
      SELECT 
        t.course_id,
        c.cradit as course_credit,
        t.grade,
        t.year,
        t.season as semester
      FROM takes t
      JOIN course c ON t.course_id = c.course_id
      WHERE t.id = $1 
        AND NOT t.is_dropped 
        AND t.grade > 0.0
      ORDER BY t.year DESC, t.season DESC, t.course_id
    `;
    const result = await database.query(sql, [id]);
    if (result) {
      return result.rows;
    } else {
      return undefined;
    }
  }
}
