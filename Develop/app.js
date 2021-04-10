const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const questions = () => {
 inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            choices: [ "manager", new inquirer.Separator(), "engineer", new inquirer.Separator(), "intern" ],
            message: 'Employee role:',
            when: () => true
          },   
          {
            type: 'input',
            name: 'name',
            message: 'First and last name:'
          },
          {
            type: 'input',
            name: 'id',
            message: 'Employee id:'
          },
          {
            type: 'input',
            name: 'email',
            message: 'Employee email:'
          },
          {
            type: 'input',
            name: 'officeNumber',
            message: 'Office number:',
            when: (answers) => answers.role === "manager"
          },
        {
           type: 'input',
           name: 'github',
           message: 'What is your GitHub username?',
           when: (answers) => answers.role === "engineer"
         },
         {
           type: 'input',
           name: 'school',
           message: 'Enter school:',
           when: (answers) => answers.role === "intern"
         }

    ]).then((answers) => {
      if (answers.role === "manager") {
      const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
      employees.push(manager);
      addEmployees();
      } else if (answers.role === "engineer") {
      const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      employees.push(engineer);
      addEmployees();
      } else if (answers.role === "intern") {
      const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      employees.push(intern);
      addEmployees();
      } else {
      console.log('please choose one.')
      }
      })
}

function addEmployees() {
  inquirer
      .prompt({
        type: 'list',
        name: 'another',
        choices: ["yes", "no"],
        message: 'Would you like to add another employee?'
      })
      .then((answers) => {
          if (answers.another === "yes") {
              questions();
          } else {
              console.log("Rendering page");
              console.log(employees)
              // renderTeam();
              writeToFile("Team-Summary", render(employees));
              
          }
      });
}

function writeToFile(fileName, data) {
  fs.writeFileSync(`output-${fileName}.html`, data);
}


questions();