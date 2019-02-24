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

// Fetch the JSON
fetch('./skills.json')
.then(res => res.json()) // Send JSON response
.then(function(data) {
    for (i=0;i<data.classes.length;i++) { // Loop through JSON and populate dropdown options
        var option = document.createElement('option');
        option.innerHTML = data.classes[i].name;
        option.setAttribute('value', data.classes[i].name.toLowerCase());
        myList.appendChild(option);
    }
});