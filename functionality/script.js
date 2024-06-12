




document.addEventListener('DOMContentLoaded', function() {
    const dailyQuestContainer = document.querySelector('.quest1-contents-container');
    const weeklyQuestContainer = document.querySelector('.quest2-contents-container');
    const changeDayBtn = document.getElementById('changeDayBtn');
    const earnCoinsBtn = document.getElementById('earnCoinsBtn');
    const rightAnsBtn = document.getElementById('rightAns');
    const wrongAnsBtn = document.getElementById('wrongAns');

    let ansProgress = 0;
    let coinProgress = 0;
    var dailyQuest = 0;
    var weeklyQuest = 0;
    var questionRow = 0;
    var coins = 0;

    let dailyQuests, weeklyQuests;


   
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            dailyQuests = data.dailyQuests;
            weeklyQuests = data.weeklyQuests;
            dailyQuest = loadRandomQuests(1,"Missão Diária :");
            weeklyQuest = loadRandomQuests(2,"Missão Semanal :")
        })
        .catch(error => console.error('Error loading quests:', error));
   
    function loadRandomQuests(id,title) {
        coins = 0;
        ansProgress = 0;
        coinProgress = 0;
        questionRow = 0;
        if (id == 1) { 
          questContainer = dailyQuestContainer;
          var randomQuest = dailyQuests[Math.floor(Math.random() * dailyQuests.length)];
        }
        else { 
          questContainer = weeklyQuestContainer;
          var randomQuest = weeklyQuests[Math.floor(Math.random() * weeklyQuests.length)];

        }
        questContainer.innerHTML = ''; 

        questContainer.innerHTML += createQuestCard(title,randomQuest,id,false);
        return randomQuest
    }


    function createQuestCard(title, quest, id, isCompleted) {
        if (isCompleted == true) {
            return `
            <div class="card">
        <div class="card-header">
          ${title}
        </div>
        <div class="card-body">
            <div class="title-holder">
          <img src="/imgs/checked.png" class="img-fluid" alt="..." id="main-img">
          <h5 class="card-title">${quest.description}</h5>
          </div>
          <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="0" aria-valuemin="0" aria-valuemax="200" style="height: 30px" id="questProgressStructure1">
            <div class="progress-bar bg-success" style="width: 100%" id="questProgressBar1">Completo!</div>
          </div>
        </div>
      </div>
            `
        }
        else {
            return `
            <div class="card">
        <div class="card-header">
          ${title}
        </div>
        <div class="card-body">
            <div class="title-holder">
          <img src="${quest.img_path}" class="img-fluid" alt="..." id="main-img">
          <h5 class="card-title">${quest.description}</h5>
          </div>
          <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="0" aria-valuemin="0" aria-valuemax="${quest.goal}" style="height: 30px" id="questProgressStructure1">
            <div class="progress-bar bg-danger" style="width: 0%" id="questProgressBar${id}">0/${quest.goal}</div>
          </div>
        </div>
      </div>
            `
        }
        
    }

    function checkCompletion(score,quest,id,title) {
        goal = quest.goal;
        if (id == 1) { 
          questContainer = dailyQuestContainer;
        }
        else { 
          questContainer = weeklyQuestContainer;

        }
        if (score >= goal) {
            questContainer.innerHTML = createQuestCard(title,quest,id,true);
        }
        else {
            return
        }
        
    }

  

    changeDayBtn.addEventListener('click', function () {
      dailyQuest = loadRandomQuests(1,"Missão Diária :");
      weeklyQuest = loadRandomQuests(2,"Missão Semanal :")
    });

    earnCoinsBtn.addEventListener("click",function() {
        coins += 50;
        questProgress = document.getElementById('questProgressBar1');
        questGoal = document.getElementById("questProgressStructure1").getAttribute("aria-valuemax");
        coinProgress += (50/questGoal)*100;
        questProgress.style.width = `${coinProgress}%`;
        if (coinProgress <= 100) {questProgress.innerHTML = `${Math.trunc(((coinProgress*questGoal)/100))}/${questGoal}` };
        checkCompletion(coins,dailyQuest,1,"Missão Diária :"); 
    });

    rightAnsBtn.addEventListener('click', function() {
        progressJson = weeklyQuest.progress;
        progressJson += 1;
        questionRow += 1;
        goalJson = weeklyQuest.goal;
        questProgress = document.getElementById('questProgressBar2');
        ansProgress += (1/goalJson)*100;
        questProgress.style.width = `${ansProgress}%`;
        if (ansProgress <= 100) {questProgress.innerHTML = `${questionRow}/${goalJson}` }; 
        checkCompletion(questionRow,weeklyQuest,2,"Missão Semanal :");  
    });

    wrongAnsBtn.addEventListener('click', function() {   
        questProgress = document.getElementById('questProgressBar2');
        questionRow = 0;
        questProgress.style.width = 0;
    })



});

