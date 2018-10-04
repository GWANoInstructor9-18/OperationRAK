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
    let hour = 24 - today.getHours();
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
// displayClock();
//HERE ENDS THE CODE FOR THE COUNTDOWN CLOCK. ----------------------------------


// this is the progress circle

var ctx = document.getElementById('myCanvas').getContext('2d');
var al = 0;
var start = 4.72;
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;

function progressSim (){
  diff = ((al / 100) * Math.PI*2*10).toFixed(2);
  ctx.clearRect(0, 0, cw,  ch);
  ctx.lineWidth = 10;
  ctx.fillStyle = '#fc4a1a';
  ctx.strokeStyle = '#f7b733';
  ctx.textAline = 'center';
  ctx.fillText = (al +'%', cw*.5, ch*.5+2, cw);
  ctx.beginPath();
  ctx.arc(100, 75, 50, start, diff/10+start, false);
  ctx.stroke();
  if(al>=100){
    clearTimeout(sim);
  }
  al++;
}
var sim = setInterval (progressSim, 50);
