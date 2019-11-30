--CREATING TABLES
CREATE TABLE departments (
    dept_no VARCHAR(50)   PRIMARY KEY
    ,dept_name VARCHAR(100) 
);
SELECT * FROM departments;

CREATE TABLE dept_emp (
    emp_no INT
    ,dept_no VARCHAR(50)
    ,from_date DATE
    ,to_date DATE
);
SELECT * FROM dept_emp;

CREATE TABLE dept_manager (
    dept_no VARCHAR(50)
    ,emp_no INT PRIMARY KEY
    ,from_date DATE
    ,to_date DATE
);
SELECT * FROM dept_manager;

CREATE TABLE employees (
    emp_no INT   PRIMARY KEY
    ,birth_date DATE
    ,first_name VARCHAR(200)
    ,last_name VARCHAR(200)
    ,gender VARCHAR(5)
    ,hire_date DATE
);
SELECT * FROM employees;

CREATE TABLE salaries (
    emp_no INT PRIMARY KEY
    ,salary INT
    ,from_date DATE
    ,to_date DATE
);
SELECT * FROM salaries;

CREATE TABLE titles (
    emp_no INT
    ,title VARCHAR(200)
    ,from_date DATE
    ,to_date DATE
);
SELECT * FROM titles;

ALTER TABLE dept_emp ADD CONSTRAINT "fk_dept_emp_emp_no" FOREIGN KEY(emp_no)
REFERENCES employees (emp_no);

ALTER TABLE dept_emp ADD CONSTRAINT "fk_dept_emp_dept_no" FOREIGN KEY(dept_no)
REFERENCES departments (dept_no);

ALTER TABLE dept_manager ADD CONSTRAINT "fk_dept_manager_dept_no" FOREIGN KEY(dept_no)
REFERENCES departments (dept_no);

ALTER TABLE dept_manager ADD CONSTRAINT "fk_dept_manager_emp_no" FOREIGN KEY(emp_no)
REFERENCES employees (emp_no);

ALTER TABLE salaries ADD CONSTRAINT "fk_salaries_emp_no" FOREIGN KEY(emp_no)
REFERENCES employees (emp_no);

ALTER TABLE titles ADD CONSTRAINT "fk_titles_emp_no" FOREIGN KEY(emp_no)
REFERENCES employees (emp_no);


-- Generating QUERIES
-- 1. List the following details of each employee: employee number, last name, first name, gender, and salary.
SELECT employees.emp_no, employees.last_name, employees.first_name, employees.gender, salaries.salary
FROM employees
JOIN salaries
ON employees.emp_no = salaries.emp_no;

-- 2. List employees who were hired in 1986.
SELECT first_name, last_name, hire_date 
FROM employees
WHERE hire_date BETWEEN '1986-01-01' AND '1987-01-01';

-- 3. List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name, and start and end employment dates.
SELECT departments.dept_no, departments.dept_name, dept_manager.emp_no, employees.last_name, employees.first_name, dept_manager.from_date, dept_manager.to_date
FROM departments
JOIN dept_manager
ON departments.dept_no = dept_manager.dept_no
JOIN employees
ON dept_manager.emp_no = employees.emp_no;

-- 4. List the department of each employee with the following information: employee number, last name, first name, and department name.
SELECT dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM dept_emp
JOIN employees
ON dept_emp.emp_no = employees.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no;

-- 5. List all employees whose first name is "Hercules" and last names begin with "B."
SELECT first_name, last_name
FROM employees
WHERE first_name = 'Hercules'
AND last_name LIKE 'B%';

-- 6. List all employees in the Sales department, including their employee number, last name, first name, and department name.
SELECT dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM dept_emp
JOIN employees
ON dept_emp.emp_no = employees.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no
WHERE departments.dept_name = 'Sales';

-- 7. List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.
SELECT dept_emp.emp_no, employees.last_name, employees.first_name, departments.dept_name
FROM dept_emp
JOIN employees
ON dept_emp.emp_no = employees.emp_no
JOIN departments
ON dept_emp.dept_no = departments.dept_no
WHERE departments.dept_name = 'Sales' 
OR departments.dept_name = 'Development';

-- 8. In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
SELECT last_name,
COUNT(last_name) AS "frequency"
FROM employees
GROUP BY last_name
ORDER BY
COUNT(last_name) DESC;