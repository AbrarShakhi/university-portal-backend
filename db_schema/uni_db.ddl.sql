-- DROP TABLE student_login CASCADE;
-- DROP TABLE student CASCADE;
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


CREATE TABLE advisor
(
  id               char(13)    NOT NULL,
  faculty_short_id varchar(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE course
(
  course_id       char(6)      NOT NULL,
  title           varchar(256) NOT NULL,
  cradit          numeric      NOT NULL,
  dept_short_name varchar(6)   NOT NULL,
  need_cradit     numeric     ,
  amount          numeric      NOT NULL,
  PRIMARY KEY (course_id)
);

CREATE TABLE department
(
  dept_short_name varchar(6)   NOT NULL,
  long_name       varchar(256) NOT NULL,
  PRIMARY KEY (dept_short_name)
);

CREATE TABLE faculty
(
  faculty_short_id varchar(10)  NOT NULL UNIQUE,
  first_name       varchar(128) NOT NULL,
  last_name        varchar(128),
  dept_short_name  varchar(6)   NOT NULL,
  PRIMARY KEY (faculty_short_id)
);

CREATE TABLE prereq
(
  course_id char(6) NOT NULL,
  prereq_id char(6) NOT NULL,
  PRIMARY KEY (course_id)
);

CREATE TABLE room
(
  room_no  varchar(7)   NOT NULL,
  building varchar(256) NOT NULL,
  PRIMARY KEY (room_no)
);

CREATE TABLE section
(
  section_no int         NOT NULL,
  course_id  char(6)     NOT NULL,
  sem_Id     varchar(16) NOT NULL,
  room_no    varchar(7)  NOT NULL,
  capacity   int        ,
  day        varchar(5)  NOT NULL,
  start_time time        NOT NULL,
  end_time   time        NOT NULL,
  PRIMARY KEY (section_no, course_id, sem_Id)
);

CREATE TABLE semester
(
  sem_Id varchar(16) NOT NULL,
  year   char(4)     NOT NULL,
  name   varchar(16) NOT NULL,
  PRIMARY KEY (sem_Id)
);

CREATE TABLE student
(
  id              char(13)     NOT NULL UNIQUE,
  first_name      varchar(128) NOT NULL,
  last_name       varchar(128),
  mobile_no       varchar(15)  NOT NULL UNIQUE,
  email           varchar(128) NOT NULL UNIQUE,
  dept_short_name varchar(6)   NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE student_login
(
  password  varchar(512),
  id        char(13)     NOT NULL,
  is_active boolean      NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id)
);

CREATE TABLE takes
(
  id         char(13)    NOT NULL,
  section_no int         NOT NULL,
  course_id  char(6)     NOT NULL,
  sem_Id     varchar(16) NOT NULL,
  grade      numeric    ,
  is_dropped boolean    ,
  PRIMARY KEY (id, section_no, course_id, sem_Id)
);

CREATE TABLE teaches
(
  faculty_short_id varchar(10) NOT NULL,
  section_no       int         NOT NULL,
  course_id        char(6)     NOT NULL,
  sem_Id           varchar(16) NOT NULL,
  PRIMARY KEY (faculty_short_id, section_no, course_id, sem_Id)
);

CREATE TABLE timeslot
(
  day        varchar(5) NOT NULL,
  start_time time       NOT NULL,
  end_time   time       NOT NULL,
  PRIMARY KEY (day, start_time, end_time)
);

ALTER TABLE student_login
  ADD CONSTRAINT FK_student_TO_student_login
    FOREIGN KEY (id)
    REFERENCES student (id);

ALTER TABLE advisor
  ADD CONSTRAINT FK_student_TO_advisor
    FOREIGN KEY (id)
    REFERENCES student (id);

ALTER TABLE advisor
  ADD CONSTRAINT FK_faculty_TO_advisor
    FOREIGN KEY (faculty_short_id)
    REFERENCES faculty (faculty_short_id);

ALTER TABLE student
  ADD CONSTRAINT FK_department_TO_student
    FOREIGN KEY (dept_short_name)
    REFERENCES department (dept_short_name);

ALTER TABLE faculty
  ADD CONSTRAINT FK_department_TO_faculty
    FOREIGN KEY (dept_short_name)
    REFERENCES department (dept_short_name);

ALTER TABLE course
  ADD CONSTRAINT FK_department_TO_course
    FOREIGN KEY (dept_short_name)
    REFERENCES department (dept_short_name);

ALTER TABLE prereq
  ADD CONSTRAINT FK_course_TO_prereq
    FOREIGN KEY (course_id)
    REFERENCES course (course_id);

ALTER TABLE prereq
  ADD CONSTRAINT FK_course_TO_prereq1
    FOREIGN KEY (prereq_id)
    REFERENCES course (course_id);

ALTER TABLE section
  ADD CONSTRAINT FK_course_TO_section
    FOREIGN KEY (course_id)
    REFERENCES course (course_id);

ALTER TABLE section
  ADD CONSTRAINT FK_room_TO_section
    FOREIGN KEY (room_no)
    REFERENCES room (room_no);

ALTER TABLE section
  ADD CONSTRAINT FK_semester_TO_section
    FOREIGN KEY (sem_Id)
    REFERENCES semester (sem_Id);

ALTER TABLE section
  ADD CONSTRAINT FK_timeslot_TO_section
    FOREIGN KEY (day, start_time, end_time)
    REFERENCES timeslot (day, start_time, end_time);

ALTER TABLE takes
  ADD CONSTRAINT FK_student_TO_takes
    FOREIGN KEY (id)
    REFERENCES student (id);

ALTER TABLE takes
  ADD CONSTRAINT FK_section_TO_takes
    FOREIGN KEY (section_no, course_id, sem_Id)
    REFERENCES section (section_no, course_id, sem_Id);

ALTER TABLE teaches
  ADD CONSTRAINT FK_faculty_TO_teaches
    FOREIGN KEY (faculty_short_id)
    REFERENCES faculty (faculty_short_id);

ALTER TABLE teaches
  ADD CONSTRAINT FK_section_TO_teaches
    FOREIGN KEY (section_no, course_id, sem_Id)
    REFERENCES section (section_no, course_id, sem_Id);
