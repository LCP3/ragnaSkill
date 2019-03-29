// Starting player job level
var lvl = 1;
// Default max player level
var maxlvl = 40;
// Starting global skill level
var baseSkillLevel = 0;
// Init var to hold JSON data
var jobdata;

// Select dropdown
var jobList = document.querySelector('select');
// Select skills container
var skillsContainer = document.getElementById('skillsContainer');
// Select skill points input and display
var jobLvl = document.getElementById("jobLvl");
var skillPoints = document.getElementById("skillPoints");

// Fetch the JSON
fetch('./skills.json')
.then(res => res.json()) // Send JSON response
.then(function(data) {
    createJobMenu(data);
    jobChoice(data);
    setJobLevel();
});

function createJobMenu(data) {
    var numOfJobs = data.jobs.length;
    for (i=0;i<numOfJobs;i++) { // Loop through JSON and populate dropdown options
        // Populate job choices
        var jobOption = document.createElement('option');
        jobOption.innerHTML = data.jobs[i].name;
        jobOption.setAttribute('value', data.jobs[i].name.toLowerCase());
        jobList.appendChild(jobOption);
        // If we're still within the current number of jobs, check if we're at an index just before a new section of jobs
        if (i < numOfJobs - 1) {
            if (data.jobs[i].jobRank == 2 && data.jobs[i+1].jobRank == 0) {
                // Create a horizontal line to separate job groups
                var optionLineBreak = document.createElement('optgroup');
                optionLineBreak.label = '──────────────────';
                optionLineBreak.setAttribute('disabled', "disabled");
                jobList.appendChild(optionLineBreak);
            }
        }
    }
}

// When a job is chosen
function jobChoice(jobData) {
    // Listen for a change of the job select dropdown
    jobList.addEventListener('change', function() {
        // Build job data HTML to the DOM with the array of skills passed through
        buildJobData(jobData);
    });
}

function buildJobData(data) {
        // Clear the current skill list
        skillsContainer.innerHTML = '';
        // Store index of selected job's skills
        var index = jobList.selectedIndex;
        // For each skill of the selected job
        data.jobs[index].skill.forEach(function(item, i) {
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

            skillDiv.dataset.maxRank = item.maxRank;
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
        // Check to see if we're within the acceptable boundaries to add skill levels
        if (skillRank < skillMax && skillPoints.innerHTML > 0) {
            // Add to the skill rank
            skillRank++;
            // Subtract from total skill points
            skillPoints.innerHTML--;
            // Set the skill rank text to the current skill rank
            skillRankSpan.innerHTML = skillRank;
        }
    });
    skillBtnMinus.addEventListener('click', function() {
        // Check to see if we're within the acceptable boundaries to subtract skill levels
        if (skillRank > 0 && skillPoints.innerHTML >= 0) {
            // Subtract from to the skill rank
            skillRank--;
            // Add to the total skill points
            skillPoints.innerHTML++;
            // Set the skill rank text to the current skill rank
            skillRankSpan.innerHTML = skillRank;
        }
    });
}

function setJobLevel() {
    // User enters a job level
    jobLvl.addEventListener('input', function() {
        // If user enters a job level higher than the maximum, set it to the max possible level
        if (jobLvl.value > maxlvl) {
            jobLvl.value = maxlvl;
        }
        // Display amount of skill points available based on job level
        skillPoints.innerHTML = jobLvl.value;
    });
}

// if skill > requiredLvl then show the dependant skill

// if call spirits = lvl 5
// enable zen (zen.display, zen.pointer-options)