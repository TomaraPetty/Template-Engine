const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = ([
        {
            type: 'list',
            name: 'title',
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
           message: 'Enter school:'
         },
         {
            type: 'list',
            name: 'another',
            choices: ["yes", "no"],
            message: 'Would you like to add another employee?'
          }

]);

const employees = [];

function renderTeam() {
    inquirer.prompt(questions).then((answers) => {
        if (answers.role === "manager") {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            employees.push(manager);
        } else if (answers.role === "engineer") {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            employees.push(engineer);
        } else if (answers.role === "intern") {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            employees.push(intern);
        } else {
            console.log('please choose one.')
        }

        if (answers.more === "yes") {
            renderTeam();
        } else { render(employees);
            writeToFile("Team-Summary", render(employees));
        }
    });
}

renderTeam();

function writeToFile(fileName, data) {
    fs.writeFileSync(`output-${fileName}.html`, data);
}


// render();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.



// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
