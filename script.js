// Starting player level
var lvl = 0;
// Default max level
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
    jobChoice(data); //Callback to event listener
    // showSkills(data);
});



// When a class is chosen
function jobChoice(data) {
    myList.addEventListener('change', function(jobClass) {
        console.log(this.value);
        console.log(this.selectedIndex);
        // Clear the current skill list
        skillsContainer.innerHTML = '';
        // Store index of skills for looping purposes
        var i = this.selectedIndex;
        data.classes[i].skill.forEach(function(item) {
            // Create HTML elements for skill info to be placed
            var skillDiv = document.createElement('div');
            skillDiv.setAttribute('class', 'skill');
            skillsContainer.appendChild(skillDiv);
            
            // var skillName = document.createElement('p');
            // skillName.innerHTML = item.name;
            // skillDiv.appendChild(skillName);

            // var skillRank = document.createElement('span');
            // skillRank.setAttribute('class', 'skillRank');
            // skillRank.innerHTML = baseSkillLevel;
            // skillName.appendChild(skillRank);

            // var skillDivider = document.createElement('p');
            // skillDivider.innerHTML = " / ";
            // skillDiv.appendChild(skillDivider);

            // var skillMax = document.createElement('span');
            // skillMax.innerHTML = item.maxRank;
            // skillDiv.appendChild(skillMax);

            // Refactor/Clean up w/ ES6 Template literal.  SICK.
            // Store data to be built w/ template literal
            var skillName = item.name;
            var skillRank = baseSkillLevel;
            var skillMax = item.maxRank;
            // Build the html for each skill
            skillDiv.innerHTML = `<p>${skillName} Rank: <span class='skillRank'>${skillRank}</span> of <span class='skillMax'>${skillMax}`;
        });
    });
}

{/* <p>Medatation Rank:<span>0</span><p> "/" </p><span>10</span></p> */}