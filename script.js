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

        questContainer.innerHTML += createQuestCard('Missão Diária', randomDailyQuest,1);
        questContainer.innerHTML += createQuestCard('Missão Semanal', randomWeeklyQuest,2);
        dailyQuest = randomDailyQuest;
        weeklyQuest = randomWeeklyQuest;
    }

    // Function to create quest card HTML
    function createQuestCard(title, quest, id) {
        return `
            <div class="card quest-card">
                <div class="card-header">
                    ${title}
                </div>
                <div class="card-body">
                    <div class="title-holder">
                        <img src="${quest.img_path}" class="img-fluid" alt="...">
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

