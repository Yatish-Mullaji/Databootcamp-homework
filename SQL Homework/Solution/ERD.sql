CREATE TABLE "departments" (
  "dept_no" VARCHAR(50) PRIMARY KEY,
  "dept_name" VARCHAR(100)
);

CREATE TABLE "dept_emp" (
  "emp_no" INT,
  "dept_no" VARCHAR(50),
  "from_date" DATE,
  "to_date" DATE
);

CREATE TABLE "dept_manager" (
  "dept_no" VARCHAR(50),
  "emp_no" INT PRIMARY KEY,
  "from_date" DATE,
  "to_date" DATE
);

CREATE TABLE "employees" (
  "emp_no" INT PRIMARY KEY,
  "birth_date" DATE,
  "first_name" VARCHAR(200),
  "last_name" VARCHAR(200),
  "gender" VARCHAR(5),
  "hire_date" DATE
);

CREATE TABLE "salaries" (
  "emp_no" INT PRIMARY KEY,
  "salary" INT,
  "from_date" DATE,
  "to_date" DATE
);

CREATE TABLE "titles" (
  "emp_no" INT,
  "title" VARCHAR(200),
  "from_date" DATE,
  "to_date" DATE
);

ALTER TABLE "dept_emp" ADD FOREIGN KEY ("emp_no") REFERENCES "employees" ("emp_no");

ALTER TABLE "dept_emp" ADD FOREIGN KEY ("dept_no") REFERENCES "departments" ("dept_no");

ALTER TABLE "dept_manager" ADD FOREIGN KEY ("dept_no") REFERENCES "departments" ("dept_no");

ALTER TABLE "dept_manager" ADD FOREIGN KEY ("emp_no") REFERENCES "employees" ("emp_no");

ALTER TABLE "salaries" ADD FOREIGN KEY ("emp_no") REFERENCES "employees" ("emp_no");

ALTER TABLE "titles" ADD FOREIGN KEY ("emp_no") REFERENCES "employees" ("emp_no");
