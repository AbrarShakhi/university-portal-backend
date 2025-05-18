-- Delete from child tables first to avoid foreign key violations
DELETE FROM takes CASCADE;
DELETE FROM teaches CASCADE;
DELETE FROM advisor CASCADE;
DELETE FROM capstone_superviser CASCADE;
DELETE FROM prereq CASCADE;
DELETE FROM section CASCADE;
DELETE FROM student_token CASCADE;
DELETE FROM student_login CASCADE;
DELETE FROM payment_history CASCADE;
DELETE FROM student CASCADE;
DELETE FROM faculty CASCADE;
DELETE FROM course CASCADE;
DELETE FROM room CASCADE;
DELETE FROM timeslot CASCADE;
DELETE FROM semester CASCADE;
DELETE FROM department CASCADE;
DELETE FROM faculty_eval CASCADE;
DELETE FROM uni_options CASCADE;

-- DEPARTMENT
INSERT INTO department (dept_short_name, long_name) VALUES
('CSE', 'Computer Science and Engineering'),
('EEE', 'Electrical and Electronic Engineering'),
('PHY', 'Physics'),
('MAT', 'Mathematics');

-- ROOM
INSERT INTO room (room_no, building) VALUES
('101', 'Engineering Building'),
('201', 'Science Building'),
('301', 'Main Building'),
('401', 'Mathematics Building');

-- FACULTY
INSERT INTO faculty (faculty_short_id, first_name, last_name, dept_short_name, fac_email, room_no) VALUES
('JS_CSE', 'John', 'Smith', 'CSE', 'john.smith@ewubd.edu', '101'),
('SJ_EEE', 'Sarah', 'Johnson', 'EEE', 'sarah.johnson@ewubd.edu', '201'),
('RW_PHY', 'Robert', 'Williams', 'PHY', 'robert.williams@ewubd.edu', '301'),
('EB_MAT', 'Emily', 'Brown', 'MAT', 'emily.brown@ewubd.edu', '401');

-- STUDENT
INSERT INTO student (id, first_name, last_name, mobile_no, email, dept_short_name, is_dismissed, address, gardian_name, gardian_phone) VALUES
('2022-1-60-206', 'Sabira Musfirat', 'Suhita', '+8801711111111', '2022-1-60-206@std.ewubd.edu', 'CSE', FALSE, 'Dhaka, Bangladesh', 'Md. Rahman', '+8801912345678'),
('2022-3-60-111', 'Tasfia Binte', 'Jahangir', '+8801722222222', '2022-3-60-111@std.ewubd.edu', 'EEE', FALSE, 'Chittagong, Bangladesh', 'Fatema Begum', '+8801987654321'),
('2022-3-60-243', 'Wasimul Bari', 'Rahat', '+8801733333333', '2022-3-60-243@std.ewubd.edu', 'PHY', FALSE, 'Khulna, Bangladesh', 'Abdul Bari', '+8801712345678'),
('2022-3-60-020', 'Fahim', 'Shahriar', '+8801744444444', '2022-3-60-020@std.ewubd.edu', 'MAT', FALSE, 'Sylhet, Bangladesh', 'Shahriar Ahmed', '+8801723456789'),
('2022-3-60-022', 'Md. Shakhiul', 'Abrar', '+8801755555555', 'msasecondary@gmail.com', 'CSE', FALSE, 'Rajshahi, Bangladesh', 'Md. Abrar Hossain', '+8801734567890');

-- ADVISOR
INSERT INTO advisor (id, faculty_short_id) VALUES
('2022-1-60-206', 'JS_CSE'),
('2022-3-60-111', 'SJ_EEE'),
('2022-3-60-243', 'RW_PHY'),
('2022-3-60-020', 'EB_MAT'),
('2022-3-60-022', 'JS_CSE');

-- CAPSTONE_SUPERVISER
INSERT INTO capstone_superviser (id, faculty_short_id) VALUES
('2022-1-60-206', 'JS_CSE'),
('2022-3-60-111', 'SJ_EEE');

-- TIMESLOT
INSERT INTO timeslot (day, start_time, end_time) VALUES
('Mon', '09:00:00', '10:30:00'),
('Tue', '11:00:00', '12:30:00'),
('Wed', '14:00:00', '15:30:00'),
('Thu', '16:00:00', '17:30:00');

-- SEMESTER
INSERT INTO semester (year, season, waver) VALUES
('2023', 'Spring', 0.0),
('2023', 'Summer', 0.0),
('2023', 'Fall', 0.0),
('2024', 'Spring', 0.0),
('2025', 'Spring', 0.0);  -- Added current semester

-- COURSE
INSERT INTO course (course_id, title, credit, dept_short_name, need_credit, amount) VALUES
('CSE101', 'Introduction to Programming', 4.5, 'CSE', 0.0, 5000.00),
('EEE201', 'Circuit Theory', 4.0, 'EEE', 0.0, 6000.00),
('PHY301', 'Quantum Mechanics', 3.0, 'PHY', 0.0, 5500.00),
('MAT401', 'Advanced Calculus', 4.0, 'MAT', 0.0, 6500.00);

-- PREREQ
INSERT INTO prereq (course_id, prereq_id) VALUES
('PHY301', 'MAT401'),
('MAT401', 'CSE101');

-- SECTION
INSERT INTO section (section_no, course_id, room_no, capacity, day, start_time, end_time, year, season) VALUES
(1, 'CSE101', '101', 30, 'Mon', '09:00:00', '10:30:00', '2023', 'Spring'),
(2, 'EEE201', '201', 25, 'Tue', '11:00:00', '12:30:00', '2023', 'Spring'),
(1, 'PHY301', '301', 20, 'Wed', '14:00:00', '15:30:00', '2023', 'Fall'),
(1, 'MAT401', '401', 35, 'Thu', '16:00:00', '17:30:00', '2024', 'Spring'),

-- New sections for Spring 2025
(1, 'CSE101', '101', 30, 'Mon', '09:00:00', '10:30:00', '2025', 'Spring'),
(2, 'EEE201', '201', 25, 'Tue', '11:00:00', '12:30:00', '2025', 'Spring'),
(1, 'PHY301', '301', 20, 'Wed', '14:00:00', '15:30:00', '2025', 'Spring'),
(1, 'MAT401', '401', 35, 'Thu', '16:00:00', '17:30:00', '2025', 'Spring');

-- TAKES
INSERT INTO takes (id, grade, is_dropped, section_no, course_id, year, season) VALUES
('2022-1-60-206', 3.5, FALSE, 1, 'CSE101', '2023', 'Spring'),
('2022-3-60-111', 3.7, FALSE, 2, 'EEE201', '2023', 'Spring'),
('2022-3-60-243', 3.2, FALSE, 1, 'PHY301', '2023', 'Fall'),
('2022-3-60-020', 4.0, FALSE, 1, 'MAT401', '2024', 'Spring'),

-- All students taking courses in Spring 2025
('2022-1-60-206', NULL, FALSE, 1, 'CSE101', '2025', 'Spring'),
('2022-1-60-206', NULL, FALSE, 2, 'EEE201', '2025', 'Spring'),

('2022-3-60-111', NULL, FALSE, 2, 'EEE201', '2025', 'Spring'),
('2022-3-60-111', NULL, FALSE, 3, 'PHY301', '2025', 'Spring'),

('2022-3-60-243', NULL, FALSE, 3, 'PHY301', '2025', 'Spring'),
('2022-3-60-243', NULL, FALSE, 4, 'MAT401', '2025', 'Spring'),

('2022-3-60-020', NULL, FALSE, 4, 'MAT401', '2025', 'Spring'),
('2022-3-60-020', NULL, FALSE, 1, 'CSE101', '2025', 'Spring'),

('2022-3-60-022', NULL, FALSE, 1, 'CSE101', '2025', 'Spring'),
('2022-3-60-022', NULL, FALSE, 2, 'EEE201', '2025', 'Spring');

-- TEACHES
INSERT INTO teaches (faculty_short_id, section_no, course_id, year, season) VALUES
('JS_CSE', 1, 'CSE101', '2023', 'Spring'),
('SJ_EEE', 2, 'EEE201', '2023', 'Spring'),
('RW_PHY', 1, 'PHY301', '2023', 'Fall'),
('EB_MAT', 1, 'MAT401', '2024', 'Spring'),

-- Teach Spring 2025 sections
('JS_CSE', 1, 'CSE101', '2025', 'Spring'),
('SJ_EEE', 2, 'EEE201', '2025', 'Spring'),
('RW_PHY', 1, 'PHY301', '2025', 'Spring'),
('EB_MAT', 1, 'MAT401', '2025', 'Spring');

-- STUDENT_LOGIN
INSERT INTO student_login (id, password) VALUES
('2022-1-60-206', 'hashed_password_1'),
('2022-3-60-111', 'hashed_password_2'),
('2022-3-60-243', 'hashed_password_3'),
('2022-3-60-020', 'hashed_password_4'),
('2022-3-60-022', 'hashed_password_5');

-- STUDENT_TOKEN
INSERT INTO student_token (id, created_date, expired_date, token, try_count) VALUES
('2022-1-60-206', NOW(), NOW() + INTERVAL '1 hour', 'token_abc123', 0),
('2022-3-60-111', NOW(), NOW() + INTERVAL '1 hour', 'token_def456', 0);

-- PAYMENT_HISTORY
INSERT INTO payment_history (id, paytime, amount) VALUES
('2022-1-60-206', NOW() - INTERVAL '30 days', 5000.00),
('2022-3-60-111', NOW() - INTERVAL '15 days', 6000.00),
('2022-3-60-243', NOW() - INTERVAL '10 days', 5500.00),
('2022-3-60-020', NOW() - INTERVAL '5 days', 6500.00);
