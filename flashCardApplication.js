// Require npm 'inquirer'
var inquirer = require('inquirer');

// Require the ClozeCard Constructor that has been exposed via module.exports.ClozeCard = function (text, cloze) {...
var clozeFlashCards = require('./ClozeCard.js');
// Require the BasicCard Constructor that has been exposed via module.exports.BasicCard = function (front, back) {...
var basicFlashCards = require('./BasicCard.js');

// Require the object for cloze-deleted questions
var questions = require('./questions.js').questions;

var basicQuestions = require('./basicQuestions.js').basicQuestions;

// Variable that holds the cloze-deleted questions in an array
var clozeFlashCardQuestion = [];

// Variable that holds the basic questions in an array
var basicFlashCardQuestion = [];

// Populate the cloze-deleted questions list
for (var i = 0; i < questions.length; i++) {
	var makeClozeQuestion = new clozeFlashCards.ClozeCard(questions[i].full, questions[i].cloze);
	clozeFlashCardQuestion.push(makeClozeQuestion);
}

// Populate the basic questions list
for (var i = 0; i < basicQuestions.length; i++) {
    var makeBasicQuestion = new basicFlashCards.BasicCard(basicQuestions[i].front, basicQuestions[i].back);
    basicFlashCardQuestion.push(makeBasicQuestion);
}

// ++++++++++++++++++++++++GLOBAL VARS for keeping track of progress/accuracy
// What basic or cloze question the user is currently on
var currentQuestion = 0;
// How many basic or cloze questions the user has gotten right
var answerRight = 0;
// How many basic or cloze questions the user has gotten wrong
var answerWrong = 0;
// ++++++++++++++++++++++++++++++++++

inquirer.prompt([{

        type: "list",
        message: "\nPlease choose an option from the list below:",
        choices: ["Cloze flashcards", "Basic flashcards", "Bye Felicia"],
        name: "menuOptions"

    }]).then(function (answer){
    var waitMsg;
    	console.log(answer);
			switch (answer.menuOptions) {

				case 'Cloze flashcards':
					console.log("OK let's run through the deck");
					waitMsg = setTimeout(askClozeQuestion, 1500);//Wait 1.5 MF'ing Seconds then call the askClozeQuestions function, m'kay
					break;

				case 'Basic flashcards':
					console.log("OK, let's run through the deck");
					waitMsg = setTimeout(askBasicQuestion, 1500);
					break;

				case 'Bye Felicia':
					console.log("Thank you for using Flashcard Coca-Cola Amazon GM Trademark")
					return;
					break;

				default:
					console.log("");
					console.log("Sorry I don't understand");
					console.log("");
			}
		});

    // 	if (answer.menuOptions === "Basic flashcards"){
    // 		console.log('you chose something basic');
    // 		askBasicQuestion();
    //     } else {
    // 		console.log('you done');
    // 		askClozeQuestion();
    // 		// askCloseQuestion();
		// }
    // });

// askClozeQuestion prompts the user to answer a given cloze-deleted question
function askClozeQuestion() {
	inquirer.prompt([{

			type: 'input',
			message: clozeFlashCardQuestion[currentQuestion].partial + '\nYour Guess: ',//Display partial question (cloze deleted portion replaced with '...' and on a new line, 'Your Guess"
			name: 'userGuess'

	}]).then(function (answers) {
		console.log(answers);
		// Check if the user has guessed correctly
		if (answers.userGuess.toLowerCase() === clozeFlashCardQuestion[currentQuestion].cloze.toLowerCase()) {
			console.log('That answer is correct!');
			answerRight++;
		} else {
			console.log('Sorry, but that is not the correct answer!');
			answerWrong++;
		}

		// Show the correct (full) answer
		console.log(clozeFlashCardQuestion[currentQuestion].full);
		console.log('-------------------------------------\n');

		// Advance to the next question
		if (currentQuestion < clozeFlashCardQuestion.length - 1) {//Compares the number of the currentQuestion (incremented each time a question is asked) against the length or number of questions in the array
			currentQuestion++;
			askClozeQuestion();
		} else {
			console.log('Number of Correct Responses: ' + answerRight);
			console.log('Number of Incorrect Guesses: ' + answerWrong);
			console.log('-------------------------------------\n');

			// Does the user want to go again?
			inquirer.prompt([
				{
					type: 'confirm',
					message: 'Would you like to run through the desk one more time?',
					name: 'playAgain'
				}
			]).then(function (answers) {
				if (answers.playAgain) {//if true, reset
					// Reset the game to initial/starting respective variable values
					currentQuestion = 0;
					answerRight = 0;
					answerWrong = 0;

					// Call askClozeQuestion function
					askClozeQuestion();
				} else {
					// Exit the application
					console.log('Bye Felicia!');
				}
			})
		}
	})
}

// // Call askClozeQuestion function
// askClozeQuestion();
//
// askBasicQuestion prompts the user to answer a given cloze-deleted question
function askBasicQuestion() {
    inquirer.prompt([{
        type: 'input',
        message: basicFlashCardQuestion[currentQuestion].front + '\nYour Guess: ',//Display partial question (cloze deleted portion replaced with '...' and on a new line, 'Your Guess"
        name: 'userGuess'

    }]).then(function (answers) {
        console.log(answers);
        // Check if the user has guessed correctly
        if (answers.userGuess.toLowerCase() === basicFlashCardQuestion[currentQuestion].back.toLowerCase()) {
            console.log('That answer is correct!');
            answerRight++;
        } else {
            console.log('Sorry, but that is not the correct answer!');
            answerWrong++;
        }

        // Show the correct answer
        console.log('The correct answer is : ' + basicFlashCardQuestion[currentQuestion].back);
        console.log('-------------------------------------\n');

        // Advance to the next question
        if (currentQuestion < basicFlashCardQuestion.length - 1) {//Compares the number of the currentQuestion (incremented each time a question is asked) against the length or number of questions in the array
            currentQuestion++;
            askBasicQuestion();
        } else {
            console.log('Number of Correct Responses: ' + answerRight);
            console.log('Number of Incorrect Guesses: ' + answerWrong);
            console.log('-------------------------------------\n');

            // Does the user want to go again?
            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Would you like to run through the deck one more time?',
                    name: 'playAgain'
                }
            ]).then(function (answers) {
                if (answers.playAgain) {//if true, reset
                    // Reset the game to initial/starting respective variable values
                    currentQuestion = 0;
                    answerRight = 0;
                    answerWrong = 0;

                    // Call askBasicQuestion function
                    askBasicQuestion();
                } else {
                    // Exit the application
                    console.log('Bye Felicia!');
                }
            })
        }
    })
}

// Call askBasicQuestion function
// askBasicQuestion();

