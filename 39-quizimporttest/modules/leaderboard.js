if (localStorage.highscore == undefined) {
localStorage.setItem('highscore', 0)
localStorage.setItem('highscoreName', "empty")

localStorage.setItem('second', 0)
localStorage.setItem('secondName', "empty")

localStorage.setItem('third', 0)
localStorage.setItem('thirdName', "empty")

localStorage.setItem('fourth', 0)
localStorage.setItem('fourthName', "empty")

localStorage.setItem('fifth', 0)
localStorage.setItem('fifthName', "empty")

localStorage.setItem('sixth', 0)
localStorage.setItem('sixthName', "empty")

localStorage.setItem('seventh', 0)
localStorage.setItem('seventhName', "empty")


localStorage.setItem('eigth', 0)
localStorage.setItem('eigthName', "empty")

localStorage.setItem('ninth', 0)
localStorage.setItem('ninthName', "empty")


localStorage.setItem('tenth', 0)
localStorage.setItem('tenthName', "empty")
}
        const categoryContainer = document.querySelector('.container');
        const rankingsPage = document.querySelector('.rankings')
        const ul = document.createElement('ul');
        const backBtn = document.querySelector('.back')
        
        
export async function saveScore(pointsTracker) {
        localStorage.setItem('points', pointsTracker);
        let player = new Leaderboard(localStorage.name, localStorage.points)

        console.log(player)
        
        if (Number(player.points) > Number(localStorage.highscore)) {
                localStorage.setItem('highscore', player.points)
                localStorage.setItem('highscoreName', player.name)
        } 
        else if (Number(player.points) > Number(localStorage.second)) {
                localStorage.setItem('second', player.points)
                localStorage.setItem('secondName', player.name)
        }
        else if (Number(player.points) > Number(localStorage.third)) {
                localStorage.setItem('third', player.points)
                localStorage.setItem('thirdName', player.name)
        }
        else if (Number(player.points) > Number(localStorage.fourth)) {
                localStorage.setItem('fourth', player.points)
                localStorage.setItem('fourthName', player.name)
        }
        else if (Number(player.points) > Number(localStorage.fifth)) {
                localStorage.setItem('fifth', player.points)
                localStorage.setItem('fifthName', player.name)
        }
        else if (Number(player.points) > Number(localStorage.sixth)) {
                localStorage.setItem('sixth', player.points)
                localStorage.setItem('sixthName', player.name)
        }
        else if (Number(player.points) > Number(localStorage.seventh)) {
                localStorage.setItem('seventh', player.points)
                localStorage.setItem('seventhName', player.name)
        }
        else if (Number(player.points) > Number(localStorage.eigth)) {
                localStorage.setItem('eigth', player.points)
                localStorage.setItem('eigthName', player.name)
        }
        else if (Number(player.points) > Number(localStorage.ninth)) {
                localStorage.setItem('ninth', player.points)
                localStorage.setItem('ninthName', player.name)
        }
        else if (Number(player.points) > Number(localStorage.tenth)) {
                localStorage.setItem('tenth', player.points)
                localStorage.setItem('tenthName', player.name)
        }
}

        

export async function leaderboardRunner (pointsTracker) {
        rankingsPage.style.display = 'block';
        
        rankingsPage.appendChild(ul);
        ul.innerHTML = `<li class="playerScores highscore">${localStorage.highscoreName} : ${localStorage.highscore} </li>
                        <li class="playerScores second">${localStorage.secondName} : ${localStorage.second} </li>
                        <li class="playerScores third">${localStorage.thirdName} : ${localStorage.third} </li>
                        <p class="rest"></p>
                        <li class="playerScores rest">${localStorage.fourthName} : ${localStorage.fourth} </li>
                        <li class="playerScores rest">${localStorage.fifthName} : ${localStorage.fifth} </li>
                        <li class="playerScores rest">${localStorage.sixthName} : ${localStorage.sixth} </li>
                        <li class="playerScores rest">${localStorage.seventhName} : ${localStorage.seventh} </li>
                        <li class="playerScores rest">${localStorage.eigthName} : ${localStorage.eigth} </li>
                        <li class="playerScores rest">${localStorage.ninthName} : ${localStorage.ninth} </li>
                        <li class="playerScores rest">${localStorage.tenthName} : ${localStorage.tenth} </li>`;
        const liList = document.querySelectorAll('.playerScores')
        
        categoryContainer.style.display = 'none';
        
        

}

backBtn.addEventListener('click', () => {
        rankingsPage.style.display = 'none';
        categoryContainer.style.display = 'block';
})

class Leaderboard {

        constructor (name, points) {
                this.name = name;
                this.points = points; 
        }
};