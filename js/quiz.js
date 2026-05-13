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
        answers: [{a:"Time"}, {b:"Water"}, {c:"Fire"}, {d:"Earth"}, {e:"Air"}]
    },
    {
        question: "2. What is your favorite weather?",
        answers: [{a:"Rainy"}, {b:"Sunny"}, {c:"Cloudy"}, {d:"Stormy"}, {e:"Windy"}]
    },
    {
        question: "3. What is your dream date?",
        answers: [{a:"The Beach"}, {b:"A Picnic"}, {c:"Hike"}, {d:"Fancy Dinner"}, {e:"Boat Ride"}]
    },
    {
        question: "4. What is your favorite food?",
        answers: [{a:"Italian"}, {b:"Fast Food"}, {c:"French"}, {d:"Chinese"}, {e:"Mexican"}]
    },
    {
        question: "5. What is your dream pet?",
        answers: [{a:"Lizard"}, {b:"Cat"}, {c:"Horse"}, {d:"Dog"}, {e:"Fish"}]
    },
    {
        question: "6. Who is the coolest person in the world?",
        answers: [{a:"Anika R S"}, {b:"Anika R"}, {c:"Anika"}, {d:"Anika Sorenson"}, {e:"Anika Rae Sorenson"}]
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
    a:"../img/quiz_monuments/astro_clock.jpg",
    b:"../img/quiz_monuments/stVitus.jpg",
    c:"../img/quiz_monuments/charlesBridge.jpg",
    d:"../img/quiz_monuments/dancingHouse.jpg",
    e:"../img/quiz_monuments/lennon.jpg"
}

let monumentResult = "";
let monumentPic = "";
let quizAnswers = [];
let answerCounts = {a:0, b:0, c:0, d: 0, e:0};

const quiz = document.getElementById("quiz");

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
            currentQuestion.answers.forEach(answerObj => {
                const letter = Object.keys(answerObj)[0];
                const answerText = answerObj[letter];

                answers.push(`
                    <label>
                        <input type="radio" name="q${questionNumber + 1}" value="${letter}" class="answer" required>
                        ${answerText}
                    </label>
                `);
            });

            // add this question and its answers to the output
            output.push(
                `<h2 class="question"> ${currentQuestion.question} </h2>
                 <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    output.push(`
        <div class="submit_section">
            <input type="submit" value="Submit" class="submit_btn">
        </div>
    `);

    // finally combine our output list into one string of HTML and put it on the page
    quiz.innerHTML = output.join('');
}

function calculateResult(event) {
    const formElem = document.querySelector("#quiz");
    const form = new FormData(formElem);
    event.preventDefault();

    if (!formElem.checkValidity()) {
        alert("One or more questions are unanswered. Please complete quiz to submit.")
        return;
    }

    form.forEach((answer) => {
        quizAnswers.push(answer);
        answerCounts[answer]++;
    });

    let mostFrequentCount = Math.max(...Object.values(answerCounts));

    let tiedChoices = Object.keys(answerCounts).filter(
        key => answerCounts[key] === mostFrequentCount
    );

    let mostFrequent = tiedChoices[
        Math.floor(Math.random() * tiedChoices.length)
        ];

    console.log(quizAnswers);
    console.log(mostFrequent);

    monumentResult = monuments[mostFrequent];
    monumentPic = monumentPics[mostFrequent];

    displayResults();
}

function displayResults(){
    quiz.innerHTML = '';
    quiz.classList.add('results');
    quiz.classList.remove('default');
    quiz.style.boxShadow = 'none';

    quiz.innerHTML =
        `<img src=${monumentPic} alt="Building Picture" id="resultImage" />\n` +
        `<h2 id="result_title">You are the ${monumentResult}</h2>\n` +
        `<div class="buttons">` +
        `   <button class="quiz_btn">Take Quiz Again</button>` +
        `   <button class="home_btn">Back to Homepage</button>` +
        `</div>`;

    let quizBtn = document.getElementsByClassName("quiz_btn")[0];
    quizBtn.addEventListener("click",redirectQuiz);

    let homeBtn = document.getElementsByClassName("home_btn")[0];
    homeBtn.addEventListener("click",redirectHome);
}

function redirectHome(){
    setTimeout(function () { window.location = "../index.html" }, 1);
}

function redirectQuiz(){
    setTimeout(function () { window.location = "../html/quiz.html" }, 1);
}

document.addEventListener("DOMContentLoaded", buildQuiz);
quiz.addEventListener("submit", calculateResult);



