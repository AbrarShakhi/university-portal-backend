INSERT INTO student
(id, first_name, last_name, mobile_no, email) VALUES
('2022-3-60-022', 'Md. Shakhiul', 'Abrar', '01234567890', 'john.doe@example.com'),
('2022-3-60-**1', 'Jane', 'Smith', '09876543210', 'jane.smith@example.com'),
('2022-3-60-**2', 'Alice', 'Johnson', '01122334455', 'alice.johnson@example.com'),
('2022-3-60-**3', 'Bob', 'Brown', '02233445566', 'bob.brown@example.com');


INSERT INTO student_login (id, password) VALUES
('2022-3-60-022', 'password123'),
('2022-3-60-**1', 'mypassword456'),
('2022-3-60-**2', 'securepass789'),
('2022-3-60-**3', 'strongpassword101');
