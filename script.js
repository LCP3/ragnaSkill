// Starting player level
var lvl = 0;
// Default max player level
var maxlvl = 40;
// Starting global skill level
var baseSkillLevel = 0;
// Init var to hold JSON data
var classdata;

// Self-reminder for arrow function equivalent
// fetch('./skills.json')
// .then(function(res) {
//   console.log(res);
//   return res.json();
// })
// .then(function(data){
//   console.log(data);
// });

// Class Selection
// Select dropdown
var myList = document.querySelector('select');
// Select skills container
var skillsContainer = document.getElementById('skillsContainer');

// Fetch the JSON
fetch('./skills.json')
.then(res => res.json()) // Send JSON response
.then(function(data) {
    for (i=0;i<data.classes.length;i++) { // Loop through JSON and populate dropdown options
        var classOpt = document.createElement('option');
        classOpt.innerHTML = data.classes[i].name;
        classOpt.setAttribute('value', data.classes[i].name.toLowerCase());
        myList.appendChild(classOpt);
    }
    jobChoice(data); //Callback to event listener for class choice
});



// When a class is chosen
function jobChoice(data) {
    // Listen for a change of the class select dropdown
    myList.addEventListener('change', function() {
        // Clear the current skill list
        skillsContainer.innerHTML = '';
        // Store index of selected class's skills
        var index = this.selectedIndex;
        // For each skill of the selected class
        data.classes[index].skill.forEach(function(item, i) {
            // Create div for skill info to be placed into
            var skillDiv = document.createElement('div');
            skillDiv.setAttribute('class', 'skill');
            skillsContainer.appendChild(skillDiv);

            // Refactor/Clean up w/ ES6 Template literal.  SICK.
            // Store data to be built out w/ template literals
            var skillName = item.name;
            var skillRank = baseSkillLevel;
            var skillMax = item.maxRank;
            // Build the html for the skill
            skillDiv.innerHTML = `<p>${skillName} Rank: <span class='skillRank'>${skillRank}</span> of <span class='skillMax'>${skillMax}`;

            // Select newly created div and add click listener
            addClickListener(i);
        });
    });
}

function addClickListener(i) {
    // Select current skill, current rank + the containing <span>, and the max rank of the skill
    var skill = document.querySelectorAll(".skill")[i];
    var skillRank = parseInt(document.querySelectorAll(".skillRank")[i].innerHTML);
    var skillRankSpan = document.querySelectorAll(".skillRank")[i];
    var skillMax = parseInt(document.querySelectorAll(".skillMax")[i].innerHTML);
    // Click event for adding ranks clicked skill
    skill.addEventListener('click', function() {
        if (skillRank < skillMax) {
            skillRank++;
            skillRankSpan.innerHTML = skillRank;
        }
    });
}