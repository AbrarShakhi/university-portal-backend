import sql from "../db/sql.js";

export default class studentDashboard {
  static async getClassSchedule(id, semester_year, semester_season) {
    const sql =
      "SELECT" +
      "  takes.course_id AS course_id," +
      "  takes.section_no AS section_no," +
      "  section.day AS day," +
      "  section.start_time AS start_time," +
      "  section.end_time AS end_time," +
      "  teaches.faculty_short_id AS faculty_short_id" +
      "FROM" +
      "  takes" +
      "    JOIN section ON takes.section_no = section.section_no" +
      "      AND takes.course_id = section.course_id" +
      "    JOIN teaches ON section.section_no = teaches.section_no" +
      "      AND section.course_id = teaches.course_id" +
      "      AND section.year = teaches.year" +
      "      AND section.season = teaches.season" +
      "WHERE" +
      "  takes.id = $1" +
      "      AND section.year = $2" +
      "      AND section.season = $3";
    const result = await sql(sql, [id, semester_year, semester_season]);

    if (result) {
      return result.rows;
    } else {
      return undefined;
    }
  }
}
