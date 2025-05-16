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
}