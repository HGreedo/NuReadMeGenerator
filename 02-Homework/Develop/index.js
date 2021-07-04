// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
//const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
  // Typed Input for - Description, Installation, Usage, Contributing, Tests, Questions
  {
    type: "input",
    name: "title",
    message: "What is the name of your project?",
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return `please enter a value to continue`;
      }
    },
  },

  {
    type: "input",
    name: "description",
    message: "please describe your project",
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return `please enter a value to continue`;
      }
    },
  },
  {
    type: "input",
    name: "installation",
    message: "please describe how to download project",
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return "please enter a value to continue";
      }
    },
  },
  {
    type: "input",
    name: "usage",
    message: "please describe how to use your project",
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return "please enter a value to continue";
      }
    },
  },
  {
    type: "input",
    name: "contributing",
    message: "please describe who/what contributed to the project",
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return "please enter a value to continue";
      }
    },
  },
  {
    type: "input",
    name: "tests",
    message: "please describe how you tested the project",
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return "please enter a value to continue";
      }
    },
  },
  {
    type: "input",
    name: "questions",
    message: "please describe any questions you may have",
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return "please enter a value to continue";
      }
    },
  },
  {
    type: "checkbox",
    name: "license",
    message: "What licenses does you project include?",
    choices: ["MIT", "ISC", "Apache", "None"],
    //needs to connect to markdown.js file to select correct license + license image then append to top of Readme
    validate: (value) => {
      if (value) {
        return true;
      } else {
        return "please enter a value to continue";
      }
    },
  },
  {
    type: "input",
    message: "What is your Github username?",
    name: "git",
  },
  {
    type: "input",
    message: "What is your LinkedIn?",
    name: "linkedin",
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email",
  },
];

function generator(answers) {
  let licenseBadge = userLicenses(answers.license);

  return `# ${answers.title}

    ${licenseBadge}


    # Table of Contents 

    * [Description](#description)
    * [Installation](#installation)
    * [Usage](#usage)
    * [Contributing](#contributing)
    * [Test]{#test}
    * [Questions](#questions)
    * [License](#license)
    
    ## Description ${answers.description}
    
    ## Installation ${answers.installation}
    
    ## Usage ${answers.usage}
    
    ## Contributing ${answers.contributing}
    
    ## Tests ${answers.tests}
    
    ## Questions ${answers.questions}
    
    ## License ${answers.license}

    # Contact 

    # Github ${answers.git}

    # LinkedIn ${answers.linkedin}

    # Email ${answers.email}`;
}

function userLicenses(license) {
  let badgeChoice = "";
  switch (license) {
    case "MIT":
      badgeChoice =
        "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)(https://opensource.org/licenses/MIT)";
      break;
    case "ISC":
      badgeChoice =
        "![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg) (https://opensource.org/licenses/ISC)";
      break;
    case "Apache":
      badgeChoice =
        "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)(https://opensource.org/licenses/Apache-2.0)";
      break;
    case "None":
      badgeChoice = "";
      break;
  }
  return badgeChoice;
}

function init() {
  inquirer.prompt(questions).then((answers) => {
    const newFile = generator(answers);
    fs.writeFile("README.md", newFile, (err) =>
      err ? console.error(err) : console.log("Created File Successfully")
    );

    console.log("Your ReadMe has been generated");
  });
}

init();
