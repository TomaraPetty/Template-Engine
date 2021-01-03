// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    // Method
    getName() {
    return this.name;
  }
     // Method
    getId() {
    return this.id;
  }
   // Method
   getEmail() {
    return this.email;
  }
   // Method
   getRole() {
    return "Employee";
  }
}

module.exports = Employee;
