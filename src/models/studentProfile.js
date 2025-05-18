import database from "../db/database.js";

export default class StudentProfile {
  static async getAll(studentId) {
    const sql = `
      WITH earned_credits AS (
        SELECT 
          t.id,
          SUM(c.credit) as total_earned_credits
        FROM takes t
        JOIN course c ON t.course_id = c.course_id
        WHERE t.id = $1 
          AND NOT t.is_dropped 
          AND t.grade > 0.0
        GROUP BY t.id
      )
      SELECT 
        s.id,
        s.first_name,
        s.last_name,
        s.mobile_no,
        s.email,
        s.dept_short_name,
        s.is_dismissed,
        s.address,
        s.gardian_name,
        s.gardian_phone,
        d.long_name as department_name,
        COALESCE(ec.total_earned_credits, 0) as total_earned_credits,
        -- Advisor Information
        adv_f.faculty_short_id as advisor_id,
        adv_f.first_name as advisor_first_name,
        adv_f.last_name as advisor_last_name,
        adv_f.fac_email as advisor_email,
        -- Capstone Superviser Information
        cap_f.faculty_short_id as superviser_id,
        cap_f.first_name as superviser_first_name,
        cap_f.last_name as superviser_last_name,
        cap_f.fac_email as superviser_email
      FROM 
        student s
        LEFT JOIN earned_credits ec ON s.id = ec.id
        JOIN department d ON s.dept_short_name = d.dept_short_name
        LEFT JOIN advisor a ON s.id = a.id
        LEFT JOIN faculty adv_f ON a.faculty_short_id = adv_f.faculty_short_id
        LEFT JOIN capstone_superviser cs ON s.id = cs.id
        LEFT JOIN faculty cap_f ON cs.faculty_short_id = cap_f.faculty_short_id
      WHERE 
        s.id = $1
    `;
    const result = await database.query(sql, [studentId]);
    if (result && result.rows.length > 0) {
      return result.rows[0];
    } else {
      return undefined;
    }
  }
}
