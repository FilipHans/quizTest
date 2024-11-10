
const newPlayer = document.querySelector('.newPlayer')
const nameForm = document.querySelector('.nameForm');
const nameInput = document.querySelector('.nameInput');

const categoryContainer = document.querySelector('.container');
const categorySelector = document.querySelectorAll('.categorySelector');

const saveScoreBtn = document.querySelector('.saveScore');
const difficultyBtn = document.querySelector('.difficultyBackBtn')
const goBack = document.querySelector('.goBack');

const difficultyForm = document.querySelector('.difficultyForm');
const difficultyContainer = document.getElementById('difficultyContainer');
let category;
let pointsTracker = 0;

import {start, end} from './modules/timer.js';
import {leaderboardRunner, saveScore} from './modules/leaderboard.js';


goBack.addEventListener('click', () => {
        categoryContainer.style.display = 'block';
        container.style.display = 'none';
                
})

difficultyBtn.addEventListener('click', () => {
categoryContainer.style.display = 'block';
difficultyContainer.style.display = 'none';

});

saveScoreBtn.addEventListener('click', () => {
        
        saveScore(pointsTracker);

});

newPlayer.addEventListener('click', () => {
        categoryContainer.style.display = 'none';
        nameForm.style.display = 'block';
});
nameForm.addEventListener('submit', (event) => {

        localStorage.setItem('name', nameInput.value);
        nameInput.value = "";

        event.preventDefault();

        setTimeout(() => {
                categoryContainer.style.display = 'block';
                nameForm.style.display = 'none';
        }, 400) 

});

async function categoryGetter(value) {
        difficultyContainer.style.display = 'block';
        difficultyForm.innerHTML = 
                                `<input type="radio" name="difficulty" id="easy" value="easy">Easy</input></br>
                                
                                <input type="radio" name="difficulty" id="medium" value="medium">Medium</input></br>
                                
                                <input type="radio" name="difficulty" id="hard" value="hard">Hard</input></br>
                                
                                <button type="submit" id="start">Start Game</button>`;
        let categoryApi = "";
        categoryContainer.style.display = 'none';
        
        switch(value) {
                case "General knowledge":
                        
                        categoryApi = "9";
                        return categoryApi;
                break;
                case "Geography":

                        categoryApi = "22";
                        return categoryApi;
                break;
                case "History":

                        categoryApi = "23";
                        return categoryApi;
                break;
                case "All categories":

                        categoryApi = "0";
                        return categoryApi;
                break; 
        }
}

function difficulty () {
        
        const easy = document.getElementById('easy');
        const medium = document.getElementById('medium');
        const hard = document.getElementById('hard');

        if (easy.checked) {
                return easy.value;
        } 
        else if (medium.checked){
                return medium.value;
        }
        else {
                return hard.value;
        }

}
let myTimer;
difficultyForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        myTimer = setInterval(() => {
                slowPoke()
        }, 10000);

       

        start();        
        let EMH = difficulty();
        runner(category, EMH)
});



categorySelector.forEach(element => {
element.addEventListener('click', async (event) => {
        roundTracker = 0;
        category = await categoryGetter(event.target.textContent);
        console.log(category)
});
});
// Above is menu navigation
// Below is quiz presenting
// 
// 
// 

const container = document.getElementById('container')
const h2 = document.createElement('h2');
container.appendChild(h2);
const p0 = document.getElementById('1');
const p1 = document.getElementById('2');
const p2 = document.getElementById('3');
const p3 = document.getElementById('4');
const questionTracker = document.getElementById('tracker');
const leaderboard = document.querySelector('.leaderboard')
let answer;
let quiz;
let randomizer;

let roundTracker = 0;

const question = document.getElementById('question');
const answerHolder = [p0, p1, p2, p3];


async function quizGetter(category, dif) {

const getter = await fetch (`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${dif}&type=multiple`);
        if (!getter.ok) {
        throw new Error('Could not get data try again');
        }

return await getter.json();

}

function quizPrinter (data) {
        console.log(data.results);
        goBack.style.display = 'block';

        const newThing = JSON.stringify(data.results[roundTracker]);
        questionTracker.textContent = `Question ${roundTracker + 1}/10`;
        console.log(roundTracker);
        const newNew = newThing.replace(/&atilde;/g, "ã").replace(/&oacute/g, "ó").replace(/&Uuml;/g, "Ü").replace(/&Eacute;/g, "É").replace(/&iacute;/g,'í').replace(/&quot;/g, '').replace(/&#039;/g, "'").replace(/&ldquo;/g, "'").replace(/&rsquo;/g, "'").replace(/&amp;/g, "&").replace(/&lrm;/g, "").replace(/&rdquo;/g, "'").replace(/&ouml;/g, "ö");
        const processedData = JSON.parse(newNew);


        console.log(processedData);

        
        const dataQuestion = processedData.question;
        answer = processedData.correct_answer;
        const incorrect1 = processedData.incorrect_answers[0];
        const incorrect2 = processedData.incorrect_answers[1];
        const incorrect3 = processedData.incorrect_answers[2];

        randomizer = [answer, incorrect1, incorrect2, incorrect3];

        shuffle(randomizer);

        question.textContent = dataQuestion;
        p0.textContent = randomizer[0];
        p1.textContent = randomizer[1];
        p2.textContent = randomizer[2];
        p3.textContent = randomizer[3];
}

answerHolder.forEach(element => {
        
        
        element.addEventListener('click', (event) => {
                roundTracker++;
                clearInterval(myTimer);
                myTimer = setInterval(slowPoke, 10000);
                answerSheet(event);

        })
});

async function slowPoke(timedout) {
        h2.textContent = 'Too slow!'
        roundTracker++;
        if (roundTracker < 10) {
                
                quizPrinter(quiz);  
        } else {
                let seconds = end();
                pointsTracker = Math.floor(pointsTracker / seconds);
                categoryContainer.style.display = 'block';
                container.style.display = 'none';
                // clearInterval(myTimer);
                goBack.style.display = 'block';
                
        }
}

async function answerSheet (event) {
        
        if(event.target.textContent == answer) {
                pointsTracker += 10000;
                
                h2.style.color = 'green';
                h2.textContent = `${answer} was correct!`
                
        } 
        else {
                h2.style.color = 'red';
                h2.textContent = `Incorrect, the correct answer was ${answer} `
                
        }

        if (roundTracker < 10) {
                
                quizPrinter(quiz);  
        } else {
                h2.textContent = "";
                let seconds = end();
                pointsTracker = Math.floor(pointsTracker / seconds);
                clearInterval(myTimer);
                categoryContainer.style.display = 'block';
                container.style.display = 'none';
                goBack.style.display = 'block';
                
        }
        

}

function shuffle(array) {
        for(let i = array.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [array[i], array[random]] = [array[random], array[i]];
        }

}
async function runner(category, dif) {
        
        difficultyContainer.style.display = 'none';
        container.style.display = 'block';
        quiz = await quizGetter(category, dif);
        quizPrinter(quiz);
}



leaderboard.addEventListener('click', () => {

        leaderboardRunner(pointsTracker);

})








