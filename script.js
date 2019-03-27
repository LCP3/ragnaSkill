// Starting player job level
var lvl = 1;
// Default max player level
var maxlvl = 40;
// Starting global skill level
var baseSkillLevel = 0;
// Init var to hold JSON data
var classdata;

// Select dropdown
var classList = document.querySelector('select');
// Select skills container
var skillsContainer = document.getElementById('skillsContainer');
// Select skillpoints input and display
var jobLvl = document.getElementById("jobLvl");
var skillPoints = document.getElementById("skillPoints");

// Fetch the JSON
fetch('./skills.json')
.then(res => res.json()) // Send JSON response
.then(function(data) {
    for (i=0;i<data.classes.length;i++) { // Loop through JSON and populate dropdown options
        // Populate class choices
        var classOption = document.createElement('option');
        classOption.innerHTML = data.classes[i].name;
        classOption.setAttribute('value', data.classes[i].name.toLowerCase());
        classList.appendChild(classOption);
        // If we're in the json array
        if (i < 25) {
            // If we're at an index of the array before a new job type
            if (data.classes[i].jobRank == 2 && data.classes[i+1].jobRank == 0) {
                // Create a horizontal line to separate job groups
                var optionLineBreak = document.createElement('optgroup');
                optionLineBreak.label = '──────────────────';
                optionLineBreak.setAttribute('disabled', "disabled");
                classList.appendChild(optionLineBreak);
            }
        }
    }
    jobChoice(data); //Callback to event listener for class choice
});

// User enters a job level
jobLvl.addEventListener('change', function() {

    if (jobLvl > maxlvl) {
        jobLvl.innerHTML = maxlvl;
        skillPoints.innerHTML = jobLvl.value;
    }
    // display amount of skillpoints available based on job level
    skillPoints.innerHTML = jobLvl.value;
    console.log(jobLvl.value);
    // if job is a trans job, add more skill points
});




// When a class is chosen
function jobChoice(classData) {
    // Listen for a change of the class select dropdown
    classList.addEventListener('change', function() {
        // Build class data HTML to the DOM with the array of skills passed through
        buildClassData(classData);
    });
}

function buildClassData(data) {
        // Clear the current skill list
        skillsContainer.innerHTML = '';
        // Store index of selected class's skills
        var index = classList.selectedIndex;
        // For each skill of the selected class
        data.classes[index].skill.forEach(function(item, i) {
            // Create div for skill info to be placed into
            var skillDiv = document.createElement('div');
            skillDiv.setAttribute('class', 'skill');
            skillsContainer.appendChild(skillDiv);

            // Store data to be built out and displayed
            var skillName = item.name;
            var skillRank = baseSkillLevel;
            var skillMax = item.maxRank;
            // Build out the html for the current skill
            skillDiv.innerHTML = `<p>${skillName} Rank: <span class='skillRank'>${skillRank}</span> of <span class='skillMax'>${skillMax}`;

            // Create, add appropriate classes to, and append buttons to each skill div
            var skillBtnPlus = document.createElement('button');
            var skillBtnMinus = document.createElement('button');
            
            skillBtnPlus.classList.add("plusBtn");
            skillBtnMinus.classList.add("minusBtn");
            skillBtnPlus.innerHTML = "+";
            skillBtnMinus.innerHTML = "-";
            skillDiv.append(skillBtnPlus);
            skillDiv.append(skillBtnMinus);
            // Select newly created div and add click listeners to buttons
            addClickListeners(i);
        });
}

function addClickListeners(i) {
    // Select current skill's buttons, current rank + the containing <span>, and the max rank of the skill
    var skillBtnPlus = document.querySelectorAll(".plusBtn")[i];
    var skillBtnMinus = document.querySelectorAll(".minusBtn")[i];

    var skillRank = parseInt(document.querySelectorAll(".skillRank")[i].innerHTML);
    var skillRankSpan = document.querySelectorAll(".skillRank")[i];
    var skillMax = parseInt(document.querySelectorAll(".skillMax")[i].innerHTML);
    // Click events for adding & subtracting ranks from skills
    skillBtnPlus.addEventListener('click', function() {
        if (skillRank < skillMax) {
            skillRank++;
            skillRankSpan.innerHTML = skillRank;
        }
    });
    skillBtnMinus.addEventListener('click', function() {
        if (skillRank > 0) {
            skillRank--;
            skillRankSpan.innerHTML = skillRank;
        }
    });
}