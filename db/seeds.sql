-- Departments
INSERT INTO department (name)
VALUES 
    ("Management"),
    ("Test Group"), 
    ("Design Group"), 
    ("Human Resources");

-- Employee Roles
INSERT INTO role (title, salary, department_id)
VALUES
    ("Director", 120000.00, 1),
    ("Section Manager", 90000.00, 2),
    ("Project Manager", 90000.00, 2),
    ("Test Engineer", 85000.00, 2),
    ("Design Engineer", 90000.00, 3),
    ("Test Intern", 30000.00, 4),
    ("Design Intern", 45000.00, 4),
    ("Hiring Specialist", 60000.00, 4);

-- Employee info

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
-- Employee managers
    ("Colin", "Campbell", 1, NULL),
    ("Eric", "Kanon", 2, NULL),
-- Employees with managers
    ("Gary", "Bradley", 3, 2),
    ("Patrick", "Whalen", 8, 3),
    ("Chloe", "Hanks", 4, 3),
    ("Grant", "Vincent", 5, 2),
    ("Justin", "Epperson", 6, 2),
    ("Kari", "Smith", 7, 2);