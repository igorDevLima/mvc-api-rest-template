import inquirer from "inquirer";
import { questions } from "./config/questions/index.js";
import { generateDirectory } from "./scripts/generateDirectory.js";
import { generateFiles } from "./scripts/generateFiles.js";
import { installDependencies } from "./scripts/installDependencies.js";

inquirer
  .prompt(questions)
  .then(async (answers) => {
    if (answers.directory != ".") {
      generateDirectory(answers.directory);
    }

    await generateFiles(answers.directory, answers.language);

    await installDependencies(
      answers.directory,
      answers.language,
      answers.database
    );
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
      // Something else went wrong
    }
  })
  .finally(() => {
    console.log("Terminal encerrado");
  });
