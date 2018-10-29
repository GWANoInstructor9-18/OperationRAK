//Stores acts in localStorage
function storeActs(actObject)
{
  let actsArray = localStorage.getItem("acts") ? JSON.parse(localStorage.getItem("acts")) : [];
  actsArray.push(actObject);
  localStorage.setItem("acts", JSON.stringify(actsArray));
}

function storePointValues(points) {
  let total = localStorage.getItem('totalPoints') ? parseInt(localStorage.getItem('totalPoints')) : 0;
  total += points;
  localStorage.setItem('totalPoints', total.toString());
  displayTotalPoints();

  sim = setInterval (progressSim, 2);
};

function displayTotalPoints()
{
  let total = localStorage.getItem('totalPoints') ? parseInt(localStorage.getItem('totalPoints')) : 0;
  let totalPointSpan = document.querySelectorAll(".total-kp-score")[0];

  totalPointSpan.textContent = total;
}

function populatePageActs(actsArray)
{
  // ACT-the-Nth-title/description.
  let a1t = document.getElementById("firstActTitle");
  let a1d = document.getElementById("firstActDesc");
  let a2t = document.getElementById("secondActTitle");
  let a2d = document.getElementById("secondActDesc");
  let a3t = document.getElementById("thirdActTitle");
  let a3d = document.getElementById("thirdActDesc");
  let a4t = document.getElementById("fourthActTitle");
  let a4d = document.getElementById("fourthActDesc");
  let a5t = document.getElementById("fifthActTitle");
  let a5d = document.getElementById("fifthActDesc");

  //Displaying in the html;
  a1t.textContent= actsArray[0].title;
  a1d.textContent= actsArray[0].description; //`${arrTitleLess[actOne]}`;
  a2t.textContent= actsArray[1].title;
  a2d.textContent= actsArray[1].description;
  a3t.textContent= actsArray[2].title;
  a3d.textContent= actsArray[2].description;
  a4t.textContent= actsArray[3].title;
  a4d.textContent= actsArray[3].description;
  a5t.textContent= actsArray[4].title;
  a5d.textContent= actsArray[4].description;
}

function getCurrentDate(now)
{
  let day = now.getDate() + 1;
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  return new Date(`${year}-${month}-${day}`);
}

//Function to handle button click actions for task completion.
function completeTask(event)
{
  if(event.target.tagName == "BUTTON")
  {
    let randomActItem = event.target.closest(".rak");
    let randomActItemID = randomActItem.id;

//these index variable and if statement reassigns the classes rak-* into their index values.
    let index = 0;
    if (randomActItemID == 'rak-1'){
    index = 0;

    }
    else if (randomActItemID == 'rak-2') {
      index = 1;
    }
    else if (randomActItemID == 'rak-3'){
      index = 2;
    }
    else if (randomActItemID == 'rak-4'){
      index = 3;
    }
    else if (randomActItemID == 'rak-5'){
      index = 4;
    };

//this statment is pulling the indivitual array and making the point value accessable.

    if (localStorage.getItem('acts')){
      let acts = JSON.parse(localStorage.getItem('acts')); //this is all of the acts
      let first = acts[index]; //first is being defined as the 1 act instead of all 5
      let points = first['point_value']; //the key/ "point_value" stored in the 1st act
      storePointValues(points);
    }
    else{
      let acts = [];
    };


//This creates the strike through when user clicks button to complete a task.
    randomActItem.classList.add("completed-task-strikeout");
    //If the user clicks a button and does not click it again in the next 3 seconds it will be disabled
    //else if the user presses the button before the time is up, the timer will be removed and the button
    //will not be disabled.Timers are removed from the timers list after they are completed.
    if(typeof timers[randomActItemID] === "undefined"){
      timers[randomActItemID] = setTimeout(toggleButtonActivity, 3000, event.target, randomActItemID);
    }
    else
    {
      //Removes the existing timeout for a button that has already been pressed then removes it from the timer array
      clearTimeout(timers[randomActItemID]);
      delete timers[randomActItemID];
      randomActItem.classList.remove("completed-task-strikeout");
    }
  }
  else if (event.target.tagName == "IMG")
  {
    //If the user clicks on the image that is set after the button then they will be asked if they wish to mark the
    //deed as unfinished. If so the button will be reactivated the the disabled image will be removed.
    if(confirm("This deed will be marked as unfinished."))
    {
      //Removes strike-through if user reactivates task aka changes task back to incomplete.
      let randomActItem = event.target.closest(".rak");
      randomActItem.classList.remove("completed-task-strikeout");
      toggleButtonActivity(event.target.parentNode);
    }
  }
  event.stopPropagation();
}

//Adds and removes the disabled button image.
function disabledButtonDisplayToggle(target)
{
  if(!target.firstChild)
  {
    let image = document.createElement("img");
    image.setAttribute("src", "img/forbidden.png");
    image.classList.add("round-button-disabled");
    //<img class="round-button-disabled" src="img/forbidden.png"/>
    target.appendChild(image);
  }
  else
  {
    target.removeChild(target.firstChild);
  }
}

//Deactivates the clicked button or cancels the timer if deactivation period is running.
function toggleButtonActivity(button, randomActItemID)
{
  if(button.disabled)
  {
    button.disabled = false;
  }
  else
  {
    button.disabled = true;
  }

  disabledButtonDisplayToggle(button);
  delete timers[randomActItemID];
}

// In the html, give the section/header/div the following id to show the clock:: 'clock'
// For example: <h1 class="text-center" id="clock"></h1>

// MAKE THE ARRAYS HERE.
// (will need at least 2: one for the titles and one for the actual description)
let arrTitles = [`HUG BUG`, `BE SPONTANEOUS!`, `COMEDIAN`, `GOOD VIBES`, `HODOR!`, `5 UP!`, `LOOKIN' GOOD!`, `SOCIAL BUTTERFLY`];
let arrActs = [`Give somebody a hug.`, `Sometimes, random acts of kindness just come to you in the moment!`, `Get somebody to laugh.`, `Write a positive comment on a website/blog/video.`, `Hold the door for someone.`, `High-five a stranger!`, `Give someone a compliment.`, `Strike up a conversation with somebody while at the store (grocery or otherwise).`];
//8 so far. Reformat into a 2D-array?

let arrTitleLess = [
    `Offer someone your pen.`,
    `Let someone go in front of you in line.`,
    `Insert coins into someone's parking meter.`,
    `Pay for someone's coffee.`,
    `Spread some encouragement online.`,
    `Learn to say "Hello" in a different language.`,
    `Do a favor without asking for anything in return.`,
    `Lend a friend a favorite book/movie.`,
    `Take the time to listen to someone.`,
    `Help a child or older person cross the street.`,
    `Leave letters of encouragement on people's cars.`,
    `Hold the elevator for someone.`,
    `Pick up litter near your home.`,
    `Say "Good Morning" to someone.`,
    `Mentor someone`,
    `Mind your manners today.`,
    `Return a rogue shopping cart to its store.`,
    `Be tolerant towards others.`,
    `Smile at 10 strangers.`,
    `Let a car merge in front of you.`,
    `Make positive small talk with strangers.`,
    `Leave a generous tip.`,
    `Praise a parent for their child.`,
    `Teach someone something new.`,
    `Clean your room without being asked.`,
    `Eat with someone new at lunch.`,
    `Help someone with yardwork.`,
    `Give a smiley face picture to someone.`,
    `Help someone with their grocery bags.`,
    `Pick up litter at a nearby park.`,
    `Be grateful.`,
    `Write a positive note on a sticky and post it somewhere.`,
    `Be more positive.`,
    `Speak kindly.`,
    `Forgive someone.`,
    `Bring your co-workers or fellow students a sweet treat.`,
    `Thank a teacher.`,
    `Share your umbrella with someone on a rainy day.`,
    `Give somebody a hug.`,
    `Sometimes, random acts of kindness just come to you in the moment!`,
    `Get somebody to laugh.`,
    `Write a positive comment on a website/blog/video.`,
    `Hold the door for someone.`,
    `High-five a stranger!`,
    `Give someone a compliment.`,
    `Strike up a conversation with somebody while at the store (grocery or other).`
  ];// 45


// PUTTING THE ACT CLASS HERE.
function Acts(actsTitle, actsDescription, actsCompletedDate = "Incomplete"){
  this.title = actsTitle;
  this.description = actsDescription;
  this.completed_date = actsCompletedDate;
  this.point_value = Math.floor(Math.random() *(99 - 15 + 1)) + 15;
};

// PUT THE ARRAY REFRESHER HERE
function arrayRefresh (){
  let newDate = getCurrentDate(new Date());
  localStorage.removeItem("acts");
  localStorage.setItem("lastRefreshDate", newDate);

  // Getting 5 random numbers that will relate to the array positions for the act todo that day.
  var arr = [];
  while(arr.length < 5){
      var randomnumber = Math.floor(Math.random()*(arrActs.length)); //+1
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
  };
  let actOne = arr[0];
  let actTwo = arr[1];
  let actThree = arr[2];
  let actFour = arr[3];
  let actFive = arr[4];

  let redOne = new Acts(arrTitles[actOne], arrActs[actOne]);
  storeActs(redOne);

  let redTwo = new Acts(arrTitles[actTwo], arrActs[actTwo]);
  storeActs(redTwo);

  let redThree = new Acts(arrTitles[actThree], arrActs[actThree]);
  storeActs(redThree);

  let redFour = new Acts(arrTitles[actFour], arrActs[actFour]);
  storeActs(redFour);

  let redFive = new Acts(arrTitles[actFive], arrActs[actFive]);
  storeActs(redFive);
  // using arrTitleLess for testing with a big array..
  // example: arrTitleLess[actOne]
  // From here, create elements with included event listeners to poplulate the space defined for these acts on the main page.

  // ACT-the-Nth-title/description.
  let a1t = document.getElementById("firstActTitle");
  let a1d = document.getElementById("firstActDesc");
  let a2t = document.getElementById("secondActTitle");
  let a2d = document.getElementById("secondActDesc");
  let a3t = document.getElementById("thirdActTitle");
  let a3d = document.getElementById("thirdActDesc");
  let a4t = document.getElementById("fourthActTitle");
  let a4d = document.getElementById("fourthActDesc");
  let a5t = document.getElementById("fifthActTitle");
  let a5d = document.getElementById("fifthActDesc");

  //Displaying in the html;
  a1t.textContent= redOne.title;
  a1d.textContent= redOne.description; //`${arrTitleLess[actOne]}`;
  a2t.textContent= redTwo.title;
  a2d.textContent= redTwo.description;
  a3t.textContent= redThree.title;
  a3d.textContent= redThree.description;
  a4t.textContent= redFour.title;
  a4d.textContent= redFour.description;
  a5t.textContent= redFive.title;
  a5d.textContent= redFive.description;
  //else, do nothing.
}; //END OF arrayRefresh function

//NEED AN EVENT LISTENER THAT listens for when all 5 buttons have been pressed and prompts the user if they want to get a new list of acts to do.

//HERE BEGINS THE CODE FOR THE COUNTDOWN CLOCK ---------------------------------
function checkTime (timeSegments) {
  if (timeSegments < 10){timeSegments= `0${timeSegments}`;};
  return timeSegments;
}; // makes our clock more normal/symmetric-looking.

// The "oops-I-made-a-mistake-I-didn't-mean-to-press-that" grace period function (?)
function countdownToCompletion(){
  //todo? make a text REGION above where the button is (or where the description text goes) that will be where this gets displayed.
  setInterval(function() {
    let now = new Date();
    let sec = now.getSeconds();
    let bigRedButton = 5 + sec;//now.getSeconds();

    while(bigRedButton !== sec ){
      sec = now.getSeconds();
      let then = sec - bigRedButton;
      //display 'then' to the REGION created above
    }
  }, 1000);
};

function displayClock(){
  const clock = document.getElementById("clock");
  setInterval(function () {
    let today = new Date();
    let lastRefreshDate = localStorage.getItem("lastRefreshDate");
    let currenDate = getCurrentDate(today);
    let hour = 23 - today.getHours();
    let min = 59 - today.getMinutes();
    let sec = 59 - today.getSeconds();
    //putting a checker to see if it's time to load up a new checklist of nice things to do.
    if( ((hour === 0) && (min===0) && (sec===0) ) || (lastRefreshDate < currenDate) ){/* call ^^^THAT FUNCTION here, and don't stop running this function. */
      arrayRefresh();
      localStorage.setItem("todaysActsCount",  0 );
    };
    hour = checkTime(hour);
    min = checkTime(min);
    sec = checkTime(sec);
    clock.textContent = `${hour}:${min}:${sec}`;
  }, 1000);
};
//HERE ENDS THE CODE FOR THE COUNTDOWN CLOCK. ----------------------------------

// this is the progress circle
// circle sizing
let canvas = document.getElementsByTagName('myCanvas')[0];
myCanvas.width  = 202;
myCanvas.height = 202;
myCanvas.style.width  = '255px';
myCanvas.style.height = '255px';

let ctx = document.getElementById('myCanvas').getContext('2d');
let kindPointCounter = 0;
let previousIndex = 0;

function getNextHighestIndex(arr, value) {
    var i = arr.length;
    while (arr[--i] > value);
    return ++i; 
}


function progressSim (){
  let usersTotalPoints = localStorage.getItem('totalPoints') ? parseInt(localStorage.getItem('totalPoints')) : 0;
  let levelCaps = [100, 300, 700, 1500, 3000, 7000, 18000, 30000, 50000, 100000, 200000, 500000, 1000000];
  let nextLevelIndex = getNextHighestIndex(levelCaps, usersTotalPoints);
  let nextLevel = levelCaps[nextLevelIndex];
  let cw = ctx.canvas.width;
  let ch = ctx.canvas.height;
  let start = 4.72;
  let diff = (( kindPointCounter / nextLevel) * Math.PI*2*10).toFixed(2);
  ctx.clearRect(0, 0, cw,  ch);
  ctx.lineWidth = 10;
  ctx.fillStyle = '#00000';
  ctx.strokeStyle = '#ff7141';
  ctx.font = '17px happy monkey'
  ctx.textAlign = 'center';
  ctx.fillText (`${kindPointCounter}/${nextLevel}`, cw*.5, ch*.5+2, cw);
  ctx.beginPath();
  ctx.arc(100, 95, 90, start, diff/10+start, false);
  ctx.stroke();
  if(kindPointCounter>=usersTotalPoints){
    clearTimeout(sim);
  }
  kindPointCounter = (previousIndex < nextLevelIndex) ? 0 : (kindPointCounter + 1);
  previousIndex = nextLevelIndex;
};
let sim = setInterval (progressSim, 2);

//////////////////
//Client Storage//
//////////////////

//If local storage has items in it get them and parse them as json else store empty array.
let actsArray = localStorage.getItem("acts") ? JSON.parse(localStorage.getItem("acts")) : [];
let todaysActsCount = localStorage.getItem("todaysActsCount") ? JSON.parse(localStorage.getItem("todaysActsCount")) : 0;
let lastRefreshDate = localStorage.getItem("lastRefreshDate") ? localStorage.getItem("lastRefreshDate") : localStorage.setItem("lastRefreshDate", getCurrentDate(new Date()));

//Set localStorage to currently stored info
localStorage.setItem("acts", JSON.stringify(actsArray));
localStorage.setItem("todaysActsCount", todaysActsCount);

///////////////////
//Initilaize Page//
///////////////////

//If no acts exist run arrayRefresh
if(!Array.isArray(actsArray) || !actsArray.length)
{
  arrayRefresh();
}
//If acts exist in storage then use them to populate the page
else{
  populatePageActs(actsArray);
}

//Display countdown timer

displayTotalPoints();
displayClock();

//////////////////
//Global Storage//
//////////////////

let timers = new Object();

////////////////
//DOM Elements//
////////////////

let randomActsList = document.querySelector(".random-acts-list");

///////////////////
//Event Listeners//
///////////////////

randomActsList.addEventListener("click", completeTask, false);
// END OF JAVASCRIPT FILE.
