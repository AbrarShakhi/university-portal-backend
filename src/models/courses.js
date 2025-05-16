export default class Courses {
  static async list(dept_short_name, semester, year) {
    const sql = `
        SELECT 
            s.section_no,
            c.course_id,
            c.title as course_title,
            c.cradit as credit_hours,
            s.capacity,
            s.room_no,
            r.building,
            s.day,
            s.start_time,
            s.end_time,
            f.faculty_short_id,
            COALESCE(f.first_name, 'TBA') as faculty_first_name,
            COALESCE(f.last_name, '') as faculty_last_name,
            COUNT(DISTINCT CASE WHEN t.is_dropped = false THEN t.id END) as enrolled_students
        FROM section s
        INNER JOIN course c ON s.course_id = c.course_id
        LEFT JOIN room r ON s.room_no = r.room_no
        LEFT JOIN teaches tch ON s.section_no = tch.section_no 
            AND s.course_id = tch.course_id 
            AND s.year = tch.year 
            AND s.season = tch.season
        LEFT JOIN faculty f ON tch.faculty_short_id = f.faculty_short_id
        LEFT JOIN takes t ON s.section_no = t.section_no 
            AND s.course_id = t.course_id 
            AND s.year = t.year 
            AND s.season = t.season
        WHERE c.dept_short_name = $1
            AND s.season = $2
            AND s.year = $3
        GROUP BY 
            s.section_no,
            c.course_id,
            c.title,
            c.cradit,
            s.capacity,
            s.room_no,
            r.building,
            s.day,
            s.start_time,
            s.end_time,
            f.faculty_short_id,
            f.first_name,
            f.last_name
        ORDER BY c.course_id, s.section_no;
        `;
    const result = await database.query(sql, [dept_short_name, semester, year]);
    if (result && result.rows.length > 0) {
      return result.rows;
    } else {
      return undefined;
    }
  }

  static async info(course_id, semester, year) {
    const sql = `
        SELECT 
            c.course_id,
            c.title as course_title,
            c.cradit as credit_hours,
            c.need_cradit as prerequisite_credit,
            c.amount as course_fee,
            s.section_no,
            s.capacity,
            s.room_no,
            r.building,
            s.day,
            s.start_time,
            s.end_time,
            f.faculty_short_id,
            COALESCE(f.first_name, 'TBA') as faculty_first_name,
            COALESCE(f.last_name, '') as faculty_last_name,
            f.fac_email as faculty_email,
            f.room_no as faculty_room,
            COUNT(DISTINCT CASE WHEN t.is_dropped = false THEN t.id END) as enrolled_students,
            (
                SELECT array_agg(p.prereq_id) 
                FROM prereq p 
                WHERE p.course_id = c.course_id
            ) as prerequisites
        FROM course c
        LEFT JOIN section s ON c.course_id = s.course_id 
            AND s.season = $2 
            AND s.year = $3
        LEFT JOIN room r ON s.room_no = r.room_no
        LEFT JOIN teaches tch ON s.section_no = tch.section_no 
            AND s.course_id = tch.course_id 
            AND s.year = tch.year 
            AND s.season = tch.season
        LEFT JOIN faculty f ON tch.faculty_short_id = f.faculty_short_id
        LEFT JOIN takes t ON s.section_no = t.section_no 
            AND s.course_id = t.course_id 
            AND s.year = t.year 
            AND s.season = t.season
        WHERE c.course_id = $1
        GROUP BY 
            c.course_id,
            c.title,
            c.cradit,
            c.need_cradit,
            c.amount,
            s.section_no,
            s.capacity,
            s.room_no,
            r.building,
            s.day,
            s.start_time,
            s.end_time,
            f.faculty_short_id,
            f.first_name,
            f.last_name,
            f.fac_email,
            f.room_no
        ORDER BY s.section_no;
        `;
    const result = await database.query(sql, [course_id, semester, year]);
    if (result && result.rows.length > 0) {
      return result.rows;
    } else {
      return undefined;
    }
  }
}
