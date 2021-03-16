const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
  // Method
  getRole() {
    return "Engineer";
  }
  // Method
  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;