-- DROP TABLE student_login CASCADE;
-- DROP TABLE student CASCADE;
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE student
(
  id         char(13)     NOT NULL UNIQUE,
  first_name varchar(128) NOT NULL,
  last_name  varchar(128),
  mobile_no  varchar(15)  NOT NULL UNIQUE,
  email      varchar(128) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE student_login
(
  password  varchar(512),
  id        char(13)     NOT NULL,
  is_active boolean      NOT NULL DEFAULT FALSE,
  PRIMARY KEY (id)
);

ALTER TABLE student_login
  ADD CONSTRAINT FK_student_TO_student_login
    FOREIGN KEY (id)
    REFERENCES student (id);
