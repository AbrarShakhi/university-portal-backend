

CREATE TABLE student
(
  id         CHAR(13)     NOT NULL UNIQUE,
  first_name VARCHAR(128) NOT NULL,
  last_name  VARCHAR(128),
  mobile_no  VARCHAR(15)  NOT NULL UNIQUE,
  email      VARCHAR(128) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE student_login
(
  password VARCHAR(512),
  id       CHAR(13)     NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE student_login
  ADD CONSTRAINT FK_student_TO_student_login
    FOREIGN KEY (id)
    REFERENCES student (id);
