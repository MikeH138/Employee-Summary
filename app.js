const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Initializing empty array where the software engineering team members will be stored
const softwareEngTeam = [];


// Writing data validation functions for the inquirer prompts
async function validateName(name) {
  if (name === '') {
    return 'Please enter a name for the employee'
  };
  return true;
};

async function validateID(name) {
  if (name === '') {
    return 'Please enter an ID for the manager'
  };
  return true;
};

async function validateEmailAddress(name) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(name)) {
    return (true)
  }
  return ("Please enter a valid email address")
};

async function validateOfficeNum(name) {
  if (name === '') {
    return 'Please enter an office number for the manager'
  };
  return true;
};

async function validateGitHubName(name) {
  if (name === '') {
    return "Please enter the engineer's github username"
  };
  return true;
};

async function validateSchool(name) {
  if (name === '') {
    return "Please enter the name of the school that the intern attends/graduated from"
  };
  return true;
};


// Function for asking the user questions about the Manager they're entering info about
function addManager() {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: "What is the manager's name?",
    validate: validateName
  },
  {
    type: 'input',
    name: 'id',
    message: "What is the manager's ID?",
    validate: validateID
  },
  {
    type: 'input',
    name: 'email',
    message: "What is the manager's email address?",
    validate: validateEmailAddress
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: "What is the manager's office number?",
    validate: validateOfficeNum
  }
  ])
    .then((answer) => {
      let newManager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
      softwareEngTeam.push(newManager);
      newEmployee();
    });
};


// Function for asking the user questions about the Engineer they're entering info about
function addEngineer() {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: "What is the engineer's name?",
    validate: validateName
  },
  {
    type: 'input',
    name: 'id',
    message: "What is the engineer's ID?",
    validate: validateID
  },
  {
    type: 'input',
    name: 'email',
    message: "What is the engineer's email address?",
    validate: validateEmailAddress
  },
  {
    type: 'input',
    name: 'github',
    message: "What is the engineer's GitHub username?",
    validate: validateGitHubName
  }
  ])
    .then((answer) => {
      let newEngineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
      softwareEngTeam.push(newEngineer);
      newEmployee();
    });
};


// Function for asking the user questions about the Intern they're entering info about
function addIntern() {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: "What is the intern's name?",
    validate: validateName
  },
  {
    type: 'input',
    name: 'id',
    message: "What is the intern's ID?",
    validate: validateID
  },
  {
    type: 'input',
    name: 'email',
    message: "What is the intern's email address?",
    validate: validateEmailAddress
  },
  {
    type: 'input',
    name: 'school',
    message: "What is the name of the school that the intern attends/graduated from?",
    validate: validateSchool
  }
  ])
    .then((answer) => {
      let newIntern = new Intern(answer.name, answer.id, answer.email, answer.school);
      softwareEngTeam.push(newIntern);
      newEmployee();
    });
};


// This function handles the very first question the user has to answer, which is what the employee's title is. Depending on what the user's answer is, they will be given the appropriate set of questions for the title they chose.
let newEmployee = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'employeeTitle',
    message: "What is this employees title? (hit Exit if done)",
    choices: [
      'Manager',
      'Engineer',
      'Intern',
      'Exit',
    ]
  }]).then((answer) => {
    
    if (answer.employeeTitle === 'Manager') {
      addManager();
    } else if (answer.employeeTitle === 'Engineer') {
      addEngineer();
    } else if (answer.employeeTitle === 'Intern') {
      addIntern();
    } else {
      writeTeam();
    }
  });
};


// Takes the contents of the softwareEngTeam array, which contains the results of the user's input, and writes it to team.html
function writeTeam() {
  if (fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, render(softwareEngTeam))
  } else {
    fs.mkdir(OUTPUT_DIR, (err) => {
      if (err) throw err
      fs.writeFileSync(outputPath, render(softwareEngTeam))
    })
  }
};

newEmployee();
writeTeam();

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
