import database from "../db/database.js";

export default class StudentLedger {
  static async tuitionHistory(studentId) {
    const sql = `
      SELECT 
        id,
        paytime,
        amount
      FROM 
        payment_history
      WHERE 
        id = $1
      ORDER BY 
        paytime DESC
    `;

    const result = await database.query(sql, [studentId]);
    if (result) {
      return result.rows;
    } else {
      return undefined;
    }
  }

  static async tuitionFees(studentId) {
    const sql = `
      WITH course_fees AS (
        SELECT 
          t.id,
          t.course_id,
          t.year,
          t.season,
          c.amount as course_amount,
          COALESCE(s.waver, 0) as semester_waver,
          CASE WHEN t.is_dropped THEN 50 ELSE 0 END as drop_refund
        FROM 
          takes t
          JOIN course c ON t.course_id = c.course_id
          JOIN semester s ON t.year = s.year AND t.season = s.season
        WHERE 
          t.id = $1
      ),
      total_payments AS (
        SELECT COALESCE(SUM(amount), 0) as total_paid
        FROM payment_history
        WHERE id = $1
      )
      SELECT 
        SUM(
          course_amount * 
          (1 - COALESCE(semester_waver, 0)/100) * 
          (1 - COALESCE(drop_refund, 0)/100)
        ) as total_fees,
        (SELECT total_paid FROM total_payments) as total_paid
      FROM course_fees
    `;

    const result = await database.query(sql, [studentId]);
    if (result && result.rows[0]) {
      const { total_fees, total_paid } = result.rows[0];
      return {
        totalFees: parseFloat(total_fees) || 0,
        totalPaid: parseFloat(total_paid) || 0,
        dueAmount: (parseFloat(total_fees) || 0) - (parseFloat(total_paid) || 0),
        currency: 'BDT'
      };
    } else {
      return {
        totalFees: 0,
        totalPaid: 0,
        dueAmount: 0,
        currency: 'BDT'
      };
    }
  }
}
