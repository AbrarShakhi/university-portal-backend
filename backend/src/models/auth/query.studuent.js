import pool from "../../db/connect.js";

export class Test {
  static async GetFromTest() {
    try {
      const query = {
        text: `SELECT * FROM test`,
      };
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Failed to fetch test", error);
      throw error;
    }
  }

  static async InsertTest(name) {
    try {
      return await pool.query("INSERT INTO test(name) VALUES($1);", [name]);
    } catch (error) {
      console.error(`Failed to insert test name: ${name}`, error);
    }
  }

  static async DeleteTest(id) {
    try {
      if (id) {
        return await pool.query("DELETE FROM TEST WHERE id = $1;", [id]);
      } else {
        return await pool.query("DELETE FROM TABLE;");
      }
    } catch (error) {
      console.error(`Failed to delete id: ${id}`, error);
    }
  }
}
