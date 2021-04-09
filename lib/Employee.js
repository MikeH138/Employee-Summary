class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  returnName() {
    return this.name;
  }

  returnID() {
    return this.id;
  }

  returnEmail() {
    return this.email;
  }

  returnRole() {
    return "Employee";
  }
};

module.exports = Employee;