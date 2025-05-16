export default class CgpaCalculator {
    static calculate(course_cgpa_credit) {
        let totalGpaCredit = 0;
        let totalCredit = 0;

        // Loop through each course
        for (const course in course_cgpa_credit) {
            const gpa = course_cgpa_credit[course].gpa;
            const credit = course_cgpa_credit[course].cred;
            
            totalGpaCredit += gpa * credit;
            totalCredit += credit;
        }

        // Calculate CGPA
        return totalCredit > 0 ? (totalGpaCredit / totalCredit).toFixed(2) : 0.00;
    }

    static calculateFromSQLForEachSemesterYear(sqlResults) {
        // Group results by year and semester
        const groupedResults = {};
        
        // First, group the results
        for (const row of sqlResults) {
            const key = `${row.year}-${row.semester}`;
            if (!groupedResults[key]) {
                groupedResults[key] = {
                    year: row.year,
                    semester: row.semester,
                    courses: [],
                    totalGpaCredit: 0,
                    totalCredit: 0
                };
            }
            
            // Add course and update totals
            groupedResults[key].courses.push({
                courseId: row.course_id,
                grade: row.grade,
                credit: row.course_credit
            });
            
            groupedResults[key].totalGpaCredit += row.grade * row.course_credit;
            groupedResults[key].totalCredit += row.course_credit;
        }
        
        // Calculate CGPA for each semester
        const results = Object.values(groupedResults).map(semesterData => ({
            year: semesterData.year,
            semester: semesterData.semester,
            courses: semesterData.courses,
            cgpa: semesterData.totalCredit > 0 
                ? (semesterData.totalGpaCredit / semesterData.totalCredit).toFixed(2) 
                : 0.00
        }));
        
        // Sort by year and semester (descending order)
        return results.sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.semester.localeCompare(a.semester);
        });
    }

    static calculateFromSQL(sqlResults) {
        let totalGpaCredit = 0;
        let totalCredit = 0;

        // Loop through SQL results
        for (const row of sqlResults) {
            const gpa = row.grade;
            const credit = row.course_credit;
            
            totalGpaCredit += gpa * credit;
            totalCredit += credit;
        }

        // Calculate CGPA
        return totalCredit > 0 ? (totalGpaCredit / totalCredit).toFixed(2) : 0.00;
    }
}