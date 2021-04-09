const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  returnRole() {
    return "Intern";
  }

  returnSchool() {
    return this.school;
  }
};

module.exports = Intern;