document.addEventListener('DOMContentLoaded', function() {
    const questContainer = document.querySelector('.quest-contents-container');
    const changeDayBtn = document.getElementById('changeDayBtn');
    const earnCoinsBtn = document.getElementById('earnCoinsBtn');
    const rightAnsBtn = document.getElementById('rightAns');
    const wrongAnsBtn = document.getElementById('wrongAns');

    let ansProgress = 0;
    let coinProgress = 0;
    var dailyQuest = 0;
    var weeklyQuest = 0;

    let dailyQuests, weeklyQuests;

    // Load quests from JSON file
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            dailyQuests = data.dailyQuests;
            weeklyQuests = data.weeklyQuests;
        })
        .catch(error => console.error('Error loading quests:', error));

    // Function to load random quests
    function loadRandomQuests() {
        ansProgress = 0;
        coinProgress = 0;
        questContainer.innerHTML = ''; // Clear previous quests
        const randomDailyQuest = dailyQuests[Math.floor(Math.random() * dailyQuests.length)];
        const randomWeeklyQuest = weeklyQuests[Math.floor(Math.random() * weeklyQuests.length)];

        questContainer.innerHTML += createQuestCard('Missão Diária', randomDailyQuest,1,false);
        questContainer.innerHTML += createQuestCard('Missão Semanal', randomWeeklyQuest,2,false);
        dailyQuest = randomDailyQuest;
        weeklyQuest = randomWeeklyQuest;
    }

    // Function to create quest card HTML
    function createQuestCard(title, quest, id, isCompleted) {
        if (isCompleted == true) {
            return `
            <div class="card">
        <div class="card-header">
          ${title}
        </div>
        <div class="card-body">
          <div class="card-content-holder">
            <div class="title-holder">
          <img src="${quest.img_path}" class="img-fluid" alt="...">
          <h5 class="card-title">${quest.description}</h5>
          </div>
            <div class="checked-img-container">
            <img src="/imgs/checked.png" alt="" class="img2">
            <span class="badge text-bg-success">Feito</span>
            </div>
          </div>
          <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="0" aria-valuemin="0" aria-valuemax="200" style="height: 30px" id="questProgressStructure1">
            <div class="progress-bar bg-success" style="width: 100%" id="questProgressBar${id}">Completa!</div>
          </div>
        </div>
      </div>
            `
        }
        else {
            return `
            <div class="card quest-card">
                <div class="card-header">
                    ${title}
                </div>
                <div class="card-body">
                    <div class="title-holder">
                        <img src="${quest.img_path}" class="img-fluid" alt="..." id="main-img">
                        <h5 class="card-title">${quest.description}</h5>
                    </div>
                    <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="${quest.progress}" aria-valuemin="0" aria-valuemax="${quest.goal}" style="height: 30px" id= "questProgressStructure${id}">
                        <div class="progress-bar bg-danger" style="width: ${quest.progress}%" id = "questProgressBar${id}">${quest.progress}%</div>
                    </div>
                    <p class="card-text">Reward: ${quest.reward} coins</p>
                </div>
            </div>
        `;
        }
        
    }

    function checkCompletion(id,quest,title) {
        questProgress = document.getElementById(`questProgressBar${id}`).style.width;
    
        questGoal = document.getElementById(`questProgressStructure${id}`).getAttribute("aria-valuemax");
        progress = (1*questGoal)/100;
        console.log(`${progress}-${questGoal}`);
        if (progress >= questGoal) {
            console.log("Is equal")
            //questContainer.innerHTML = createQuestCard(title,quest,id,true);
        }
        console.log(`Not equal.`)
        
    }

    // Add event listener to the button
    changeDayBtn.addEventListener('click', loadRandomQuests);

    earnCoinsBtn.addEventListener("click",function() {
        questProgress = document.getElementById('questProgressBar1');
        questGoal = document.getElementById("questProgressStructure1").getAttribute("aria-valuemax");
        coinProgress += (50/questGoal)*100;
        questProgress.style.width = `${coinProgress}%`;
        if (coinProgress <= 100) {questProgress.innerHTML = `${Math.trunc(((coinProgress*questGoal)/100))}/${questGoal}` }
    });

    rightAnsBtn.addEventListener('click', function() {
        console.log("Hapenned");
        checkCompletion(2,weeklyQuest,"Missão Semanal: ");
        questProgress = document.getElementById('questProgressBar2');
        questGoal = document.getElementById("questProgressStructure2").getAttribute("aria-valuemax");
        ansProgress += (1/questGoal)*100;
        questProgress.style.width = `${ansProgress}%`;
        if (ansProgress <= 100) {questProgress.innerHTML = `${Math.trunc(((ansProgress*questGoal)/100))}/${questGoal}` }   
    });

    wrongAnsBtn.addEventListener('click', function() {   
        questProgress = document.getElementById('questProgressBar2');
        ansProgress = 0;
        questProgress.style.width = ansProgress
    })





});

