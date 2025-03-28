import query from "../../db/query.js";

export default class studentDashboard {
  static async getClassSchedule(id, semester_year, semester_season) {
    const q =
      "SELECT" +
      "takes.course_id," +
      "takes.section_no," +
      "section.day," +
      "section.start_time," +
      "section.end_time," +
      "teaches.faculty_short_id" +
      "FROM" +
      "takes" +
      "JOIN section ON takes.section_no = section.section_no" +
      "AND takes.course_id = section.course_id" +
      "JOIN teaches ON section.section_no = teaches.section_no" +
      "AND section.course_id = teaches.course_id" +
      "AND section.year = teaches.year" +
      "AND section.season = teaches.season" +
      "WHERE" +
      "takes.id = $1" +
      "AND section.year = $2" +
      "AND section.season = $3";
    const result = await query(q, [id, semester_year, semester_season]);

    if (result && result.rows) {
      return result.rows;
    } else {
      return undefined;
    }
  }
}
