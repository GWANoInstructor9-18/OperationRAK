// In the html, give the section/header/div the following id to show the clock:: 'clock'
// For example: <h1 class="text-center" id="clock"></h1>

// MAKE THE ARRAYS HERE.
// (will need at least 2: one for the titles and one for the actual description)

// PUT THE boolean VALUE HERE (for preventing the users from spamming the "refresh" feature)
let clear_to_refresh = true;

// PUT THE ARRAY REFRESHER HERE
// (need to dig up the randomizer selector from previous class or find one with internet)
function arrayRefresh (){
  //do stuff here.
};

//HERE BEGINS THE CODE FOR THE COUNTDOWN CLOCK ---------------------------------
function checkTime (timeSegments) {
  if (timeSegments < 10){timeSegments= `0${timeSegments}`;};
  return timeSegments;
}; // makes our clock more normal/symmetric-looking.

function displayClock(){
  const clock = document.getElementById("clock");
  // Jacob here, I really hope this is the best way of going about it.
  setInterval(function () {
    let today = new Date();
    let hour = 23 - today.getHours();
    let min = 60 - today.getMinutes();
    let sec = 60 - today.getSeconds();
    //putting a checker to see if it's time to load up a new checklist of nice things to do.
    if( (hour === 0) && (min===0) && (sec===0) ){/* call ^^^THAT FUNCTION here, and don't stop running this function. */
      arrayRefresh();
      //also, reset the 'do_more' boolean to TRUE (note: do this inside the array refresher)
    };
    hour = checkTime(hour);
    min = checkTime(min);
    sec = checkTime(sec);
    clock.textContent = `${hour}:${min}:${sec}`;
  }, 1000);
};
displayClock();

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

function progressSim (){
  let cw = ctx.canvas.width;
  let ch = ctx.canvas.height;
  let start = 4.72;
  let diff = (( kindPointCounter / 100) * Math.PI*2*10).toFixed(2);
  ctx.clearRect(0, 0, cw,  ch);
  ctx.lineWidth = 10;
  ctx.fillStyle = '#00000';
  ctx.strokeStyle = '#ff7141';
  ctx.font = '17px happy monkey'
  ctx.textAlign = 'center';
  ctx.fillText (kindPointCounter +'/100', cw*.5, ch*.5+2, cw);
  ctx.beginPath();
  ctx.arc(100, 95, 90, start, diff/10+start, false);
  ctx.stroke();
  if(kindPointCounter>=75){
    clearTimeout(sim);
  }
  kindPointCounter++;
}
let sim = setInterval (progressSim, 50);
