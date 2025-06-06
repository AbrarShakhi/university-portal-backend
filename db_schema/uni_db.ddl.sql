DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


CREATE TABLE advisor
(
  id               char(13)    NOT NULL,
  faculty_short_id varchar(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE capstone_superviser
(
  id               char(13)    NOT NULL,
  faculty_short_id varchar(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE course
(
  course_id       char(6)        NOT NULL,
  title           varchar(256)   NOT NULL,
  credit          numeric(2, 1)  NOT NULL,
  dept_short_name varchar(6)     NOT NULL,
  need_credit     numeric(4, 1) ,
  amount          numeric(10, 4) NOT NULL,
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
  fac_email        varchar(128) NOT NULL UNIQUE,
  room_no          varchar(7)   NOT NULL,
  PRIMARY KEY (faculty_short_id)
);

CREATE TABLE faculty_eval
(
  faculty_short_id varchar(10)   NOT NULL,
  rating           numeric(2, 0),
  id               char(13)      NOT NULL,
  year             char(4)       NOT NULL,
  season           varchar(16)   NOT NULL,
  PRIMARY KEY (faculty_short_id, id, year, season)
);

CREATE TABLE payment_history
(
  id      char(13)       NOT NULL,
  paytime timestamp      NOT NULL,
  amount  numeric(16, 4),
  PRIMARY KEY (id, paytime)
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
  room_no    varchar(7)  NOT NULL,
  capacity   int        ,
  day        varchar(5)  NOT NULL,
  start_time time        NOT NULL,
  end_time   time        NOT NULL,
  year       char(4)     NOT NULL,
  season     varchar(16) NOT NULL,
  PRIMARY KEY (section_no, course_id, year, season)
);

CREATE TABLE semester
(
  year   char(4)       NOT NULL,
  season varchar(16)   NOT NULL,
  waver  numeric(3, 1),
  PRIMARY KEY (year, season)
);

CREATE TABLE student
(
  id              char(13)     NOT NULL UNIQUE,
  first_name      varchar(128) NOT NULL,
  last_name       varchar(128),
  mobile_no       varchar(15)  NOT NULL UNIQUE,
  email           varchar(128) NOT NULL UNIQUE,
  dept_short_name varchar(6)   NOT NULL,
  is_dismissed    boolean      NOT NULL DEFAULT false,
  address         varchar(128),
  gardian_name    varchar(128),
  gardian_phone   varchar(128),
  PRIMARY KEY (id)
);

CREATE TABLE student_login
(
  password varchar(512),
  id       char(13)     NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE student_token
(
  created_date timestamp    NOT NULL,
  expired_date timestamp    NOT NULL,
  token        varchar(512),
  try_count    int          NOT NULL DEFAULT 0,
  id           char(13)     NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE takes
(
  id         char(13)      NOT NULL,
  grade      numeric(4, 2) DEFAULT 0.0,
  is_dropped boolean       DEFAULT false,
  section_no int           NOT NULL,
  course_id  char(6)       NOT NULL,
  year       char(4)       NOT NULL,
  season     varchar(16)   NOT NULL,
  PRIMARY KEY (id, section_no, course_id, year, season)
);

CREATE TABLE teaches
(
  faculty_short_id varchar(10) NOT NULL,
  section_no       int         NOT NULL,
  course_id        char(6)     NOT NULL,
  year             char(4)     NOT NULL,
  season           varchar(16) NOT NULL,
  PRIMARY KEY (faculty_short_id, section_no, course_id, year, season)
);

CREATE TABLE timeslot
(
  day        varchar(5) NOT NULL,
  start_time time       NOT NULL,
  end_time   time       NOT NULL,
  PRIMARY KEY (day, start_time, end_time)
);

CREATE TABLE uni_options
(
  is_advising boolean     NOT NULL DEFAULT false,
  is_fac_eval boolean     NOT NULL DEFAULT false,
  year        char(4)     NOT NULL,
  season      varchar(16) NOT NULL
);

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
  ADD CONSTRAINT FK_timeslot_TO_section
    FOREIGN KEY (day, start_time, end_time)
    REFERENCES timeslot (day, start_time, end_time);

ALTER TABLE takes
  ADD CONSTRAINT FK_student_TO_takes
    FOREIGN KEY (id)
    REFERENCES student (id);

ALTER TABLE teaches
  ADD CONSTRAINT FK_faculty_TO_teaches
    FOREIGN KEY (faculty_short_id)
    REFERENCES faculty (faculty_short_id);

ALTER TABLE section
  ADD CONSTRAINT FK_semester_TO_section
    FOREIGN KEY (year, season)
    REFERENCES semester (year, season);

ALTER TABLE takes
  ADD CONSTRAINT FK_section_TO_takes
    FOREIGN KEY (section_no, course_id, year, season)
    REFERENCES section (section_no, course_id, year, season);

ALTER TABLE teaches
  ADD CONSTRAINT FK_section_TO_teaches
    FOREIGN KEY (section_no, course_id, year, season)
    REFERENCES section (section_no, course_id, year, season);

ALTER TABLE student_login
  ADD CONSTRAINT FK_student_TO_student_login
    FOREIGN KEY (id)
    REFERENCES student (id);

ALTER TABLE student_token
  ADD CONSTRAINT FK_student_TO_student_token
    FOREIGN KEY (id)
    REFERENCES student (id);

ALTER TABLE capstone_superviser
  ADD CONSTRAINT FK_student_TO_capstone_superviser
    FOREIGN KEY (id)
    REFERENCES student (id);

ALTER TABLE capstone_superviser
  ADD CONSTRAINT FK_faculty_TO_capstone_superviser
    FOREIGN KEY (faculty_short_id)
    REFERENCES faculty (faculty_short_id);

ALTER TABLE payment_history
  ADD CONSTRAINT FK_student_TO_payment_history
    FOREIGN KEY (id)
    REFERENCES student (id);

ALTER TABLE faculty
  ADD CONSTRAINT FK_room_TO_faculty
    FOREIGN KEY (room_no)
    REFERENCES room (room_no);

ALTER TABLE uni_options
  ADD CONSTRAINT FK_semester_TO_uni_options
    FOREIGN KEY (year, season)
    REFERENCES semester (year, season);

ALTER TABLE faculty_eval
  ADD CONSTRAINT FK_faculty_TO_faculty_eval
    FOREIGN KEY (faculty_short_id)
    REFERENCES faculty (faculty_short_id);

ALTER TABLE faculty_eval
  ADD CONSTRAINT FK_student_TO_faculty_eval
    FOREIGN KEY (id)
    REFERENCES student (id);

ALTER TABLE faculty_eval
  ADD CONSTRAINT FK_semester_TO_faculty_eval
    FOREIGN KEY (year, season)
    REFERENCES semester (year, season);
