const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNum) {
    super(name, id, email);
    this.officeNum = officeNum;
  }

  returnRole() {
    return "Manager";
  }

  returnOfficerNum() {
    return this.officeNum;
  }
};

module.exports = Manager;