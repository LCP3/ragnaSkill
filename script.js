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
        // Add all skills to container
        // for(i=this.selectedIndex;i<data.classes[i].skill.length;i++) {
        //     var skill = document.createElement('p');
        //     data.classes[i].skill.forEach(function(e) {
        //         console.log(e);
        //     });
        //     // skill.innerHTML = data.classes[i].skill.name;
        //     console.log(data.classes[i].skill.length);
        //     skillsContainer.appendChild(skill);
        // }
        var i = this.selectedIndex;

        data.classes[i].skill.forEach(function(item) {
            var skill = document.createElement('p');
            skill.innerHTML = item.name;
            skillsContainer.appendChild(skill);
        });
        


    });
}

// i = 0 -- classes[0].skill[0].name
// selecting class 3
// i=0
// i needs to equal the index of the chosen class
// acolyte = i = 0
// priest = i = 1
// monk = i = 2