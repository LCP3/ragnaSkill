// Starting player level
var lvl = 0;
// Default max level
var maxlvl = 40;
// Init var to hold data
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

fetch('./skills.json')
.then(res => res.json())
.then(data => classdata = data)
.then(i => console.log(classdata));






// console.log(data);
// Iterate through classdata for individual classes

// Display classes
// classdata.class.forEach(i => {
//   console.log(i); //Acolyte
// });

//Choose a class


// Display skills for chosen class