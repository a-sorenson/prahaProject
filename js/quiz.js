/*
* Pseudo Code for quiz
* When submitted ->
* For each question add up assigned value
* determine what the average value is
* from average value return pictures and text that corresponds to building
*
* */

const questions = [
    {
        question: "1. What element do you most identify with?",
        answers: ["a", "b", "c", "d", "e"]
    },
    {
        question: "Question 2",
        answers: ["a", "b", "c", "d", "e"]
    },
    {
        question: "Question 2",
        answers: ["a", "b", "c", "d", "e"]
    },
    {
        question: "Question 2",
        answers: ["a", "b", "c", "d", "e"]
    },
    {
        question: "Question 2",
        answers: ["a", "b", "c", "d", "e"]
    },
    {
        question: "Question 2",
        answers: ["a", "b", "c", "d", "e"]
    }
];

let monuments = {
    a:"Astronomical Clock",
    b:"St Vitus Cathedral",
    c:"Charles Bridge",
    d:"Dancing House",
    e:"Lennon Wall"
};

let monumentPics = {
    a:"../img/astro_clock.jpg"
}

let monumentResult = "";
let monumentPic = "";
let quizAnswers = [];
let answerCounts = {a:0, b:0, c:0, d: 0, e:0};

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

//https://www.sitepoint.com/simple-javascript-quiz/
function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    questions.forEach(
        (currentQuestion, questionNumber) => {

            // variable to store the list of possible answers
            const answers = [];

            // and for each available answer...
            for(let letter in currentQuestion.answers){
                // ...add an HTML radio button
                answers.push(
                    `<label>
                        <input type="radio" name="q${questionNumber+1}" value="${currentQuestion.answers[letter]}" class="answer">
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    output.push('<input type="submit" value="Submit">');

    // finally combine our output list into one string of HTML and put it on the page
    quiz.innerHTML = output.join('');
}

function calculateResult(event) {
    const formElem = document.querySelector("#quiz");
    const form = new FormData(formElem);

    form.forEach((answer) => {
        quizAnswers.push(answer);
        answerCounts[answer]++;
    });

    let mostFrequent;
    let mostFrequentCount = 0;

    for (let count in answerCounts)  {
        if (answerCounts[count] > mostFrequentCount) {
            mostFrequent = count;
            mostFrequentCount = answerCounts[count];
        }
    }
    event.preventDefault();
    console.log(quizAnswers);
    console.log(mostFrequent);

    monumentResult = monuments[mostFrequent];
    monumentPic = monumentPics[mostFrequent];

    displayResults();
}

function displayResults(){
    quiz.innerHTML = '';

    quiz.innerHTML = `<h2>You are the ${monumentResult}</h2>\n` +
        `<img src=${monumentPic} alt="Building Picture" id="resultImage" />\n` +
        `<button class="back">Back to Homepage</button>`;

    let backBtn = document.getElementsByClassName("back")[0];
    backBtn.addEventListener("click",redirect);
}

function redirect(){
    setTimeout(function () { window.location = "../html/homepage.html" }, 1);
}

document.addEventListener("DOMContentLoaded", buildQuiz);
quiz.addEventListener("submit", calculateResult);



