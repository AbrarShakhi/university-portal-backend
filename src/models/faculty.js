import database from "../db/database.js";

export default class StudentProfile {
  static async list() {
    const sql = `
    SELECT 
      f.faculty_short_id,
      CONCAT(f.first_name, ' ', COALESCE(f.last_name, '')) as full_name,
      f.dept_short_name,
      d.long_name as department_name
    FROM faculty f
    JOIN department d ON f.dept_short_name = d.dept_short_name
    ORDER BY f.faculty_short_id
    `;
    const result = await database.query(sql);
    if (result) {
      return result.rows;
    } else {
      return undefined;
    }
  }

  static async info(faculty_short_id) {
    const sql = `
    SELECT 
      f.faculty_short_id,
      CONCAT(f.first_name, ' ', COALESCE(f.last_name, '')) as full_name,
      f.dept_short_name,
      d.long_name as department_name,
      f.fac_email as email,
      f.room_no,
      r.building
    FROM faculty f
    JOIN department d ON f.dept_short_name = d.dept_short_name
    JOIN room r ON f.room_no = r.room_no
    WHERE f.faculty_short_id = $1
    `;
    const result = await database.query(sql, [faculty_short_id]);
    if (result && result.rows.length > 0) {
      return result.rows[0];
    } else {
      return undefined;
    }
  }
  static async teaches(faculty_short_id, semester, year) {
    const sql = `
    SELECT 
      t.course_id,
      c.title as course_title,
      t.section_no,
      s.room_no,
      s.day,
      s.start_time,
      s.end_time
    FROM teaches t
    JOIN section s ON t.section_no = s.section_no 
      AND t.course_id = s.course_id 
      AND t.year = s.year 
      AND t.season = s.season
    JOIN course c ON t.course_id = c.course_id
    WHERE t.faculty_short_id = $1 
      AND t.season = $2 
      AND t.year = $3
    ORDER BY s.day, s.start_time
    `;
    const result = await database.query(sql, [
      faculty_short_id,
      semester,
      year,
    ]);
    if (result) {
      return result.rows;
    } else {
      return undefined;
    }
  }
}
