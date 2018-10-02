// In the html, give the section/header/div the following id to show the clock:: 'clock'
// For example: <h1 class="text-center" id="clock"></h1>

// MAKE THE ARRAYS HERE.
// (will need at least 2: one for the titles and one for the actual description)

// PUT THE boolean VALUE HERE (for preventing the users from spamming the "refresh" feature)
let clear_to_refresh = true;

// PUT THE ARRAY REFRESHER HERE
// (need to dig up the randomizer selector from previous class or find one with internet)
function array_refresh (){
  //do stuff here.
};

//HERE BEGINS THE CODE FOR THE COUNTDOWN CLOCK ---------------------------------
function time_segments (i) {
  if (i < 10){i= `0${i}`;};
  return i;
}; // makes our clock more normal/symmetric-looking.

function display_clock(){
  const clock = document.getElementById("clock");
  // Jacob here, I really hope this is the best way of going about it.
  setInterval(function () {
    let today = new Date();
    let hour = 24 - today.getHours();
    let min = 60 - today.getMinutes();
    let sec = 60 - today.getSeconds();
    //putting a checker to see if it's time to load up a new checklist of nice things to do.
    if( (hour === 0) && (min===0) && (sec===0) ){/* call ^^^THAT FUNCTION here, and don't stop running this function. */
      array_refresh();
      //also, reset the 'do_more' boolean to TRUE (note: do this inside the array refresher)
    };
    hour = time_segments(hour);
    min = time_segments(min);
    sec = time_segments(sec);
    clock.textContent = `${hour}:${min}:${sec}`;
  }, 1000);
};
display_clock();
//HERE ENDS THE CODE FOR THE COUNTDOWN CLOCK. ----------------------------------
