-- Delete from child tables first to avoid foreign key violations
DELETE FROM takes;
DELETE FROM teaches;
DELETE FROM advisor;
DELETE FROM prereq;
DELETE FROM section;
DELETE FROM student_token;
DELETE FROM student_login;
DELETE FROM student;
DELETE FROM faculty;
DELETE FROM course;
DELETE FROM room;
DELETE FROM timeslot;
DELETE FROM semester;
DELETE FROM department;


-- DEPARTMENT (unchanged)
INSERT INTO department (dept_short_name, long_name) VALUES
('CSE', 'Computer Science and Engineering'),
('EEE', 'Electrical and Electronic Engineering'),
('PHY', 'Physics'),
('MAT', 'Mathematics');

-- FACULTY (revised format)
INSERT INTO faculty (faculty_short_id, first_name, last_name, dept_short_name) VALUES
('JS_CSE', 'John', 'Smith', 'CSE'),
('SJ_EEE', 'Sarah', 'Johnson', 'EEE'),
('RW_PHY', 'Robert', 'Williams', 'PHY'),
('EB_MAT', 'Emily', 'Brown', 'MAT');

-- STUDENT (revised ID format)
INSERT INTO student (id, first_name, last_name, mobile_no, email, dept_short_name) VALUES
('2023-1-01-001', 'Alice', 'Johnson', '+8801711111111', 'alice@univ.edu', 'CSE'),
('2022-3-60-111', 'Tasfia Binte', 'Jahangir', '+8801722222222', '2022-3-60-111@std.ewubd.edu', 'EEE'),
('2022-3-60-243', 'Wasimul Bari', 'Rahat', '+8801733333333', '2022-3-60-243@std.ewubd.edu', 'PHY'),
('2022-3-60-020', 'Fahim', 'Shahriar', '+8801744444444', '2022-3-60-020@std.ewubd.edu', 'MAT');

-- ADVISOR (updated references)
INSERT INTO advisor (id, faculty_short_id) VALUES
('2023-1-01-001', 'JS_CSE'),
('2022-3-60-111', 'SJ_EEE'),
('2022-3-60-243', 'RW_PHY'),
('2022-3-60-020', 'EB_MAT');

-- ROOM (unchanged)
INSERT INTO room (room_no, building) VALUES
('101', 'Engineering Building'),
('201', 'Science Building'),
('301', 'Main Building'),
('401', 'Mathematics Building');

-- TIMESLOT (unchanged)
INSERT INTO timeslot (day, start_time, end_time) VALUES
('Mon', '09:00:00', '10:30:00'),
('Tue', '11:00:00', '12:30:00'),
('Wed', '14:00:00', '15:30:00'),
('Thu', '16:00:00', '17:30:00');

-- SEMESTER (unchanged)
INSERT INTO semester (year, season) VALUES
('2023', 'Spring'),
('2023', 'Summer'),
('2023', 'Fall'),
('2024', 'Spring');

-- COURSE (unchanged)
INSERT INTO course (course_id, title, cradit, dept_short_name, need_cradit, amount) VALUES
('CSE101', 'Introduction to Programming', 3.0, 'CSE', NULL, 5000),
('EEE201', 'Circuit Theory', 4.0, 'EEE', NULL, 6000),
('PHY301', 'Quantum Mechanics', 3.0, 'PHY', 60, 5500),
('MAT401', 'Advanced Calculus', 4.0, 'MAT', 30, 6500);

-- PREREQ (unchanged)
INSERT INTO prereq (course_id, prereq_id) VALUES
('PHY301', 'MAT401'),
('MAT401', 'CSE101');

-- SECTION (unchanged)
INSERT INTO section (section_no, course_id, room_no, capacity, day, start_time, end_time, year, season) VALUES
(1, 'CSE101', '101', 30, 'Mon', '09:00:00', '10:30:00', '2023', 'Spring'),
(2, 'EEE201', '201', 25, 'Tue', '11:00:00', '12:30:00', '2023', 'Spring'),
(1, 'PHY301', '301', 20, 'Wed', '14:00:00', '15:30:00', '2023', 'Fall'),
(1, 'MAT401', '401', 35, 'Thu', '16:00:00', '17:30:00', '2024', 'Spring');

-- TAKES (updated IDs)
INSERT INTO takes (id, grade, is_dropped, section_no, course_id, year, season) VALUES
('2023-1-01-001', 3.5, FALSE, 1, 'CSE101', '2023', 'Spring'),
('2022-3-60-111', 3.7, FALSE, 2, 'EEE201', '2023', 'Spring'),
('2022-3-60-243', 3.2, FALSE, 1, 'PHY301', '2023', 'Fall'),
('2022-3-60-020', 4.0, FALSE, 1, 'MAT401', '2024', 'Spring');

-- TEACHES (updated faculty references)
INSERT INTO teaches (faculty_short_id, section_no, course_id, year, season) VALUES
('JS_CSE', 1, 'CSE101', '2023', 'Spring'),
('SJ_EEE', 2, 'EEE201', '2023', 'Spring'),
('RW_PHY', 1, 'PHY301', '2023', 'Fall'),
('EB_MAT', 1, 'MAT401', '2024', 'Spring');
