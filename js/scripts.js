

// circle siziing
var canvas = document.getElementsByTagName('myCanvas')[0];
myCanvas.width  = 202;
myCanvas.height = 202;
myCanvas.style.width  = '255px';
myCanvas.style.height = '255px';

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
  ctx.fillStyle = '#00000';
  ctx.strokeStyle = '#ff7141';
  ctx.font = '17px happy monkey'
  ctx.textAlign = 'center';
  ctx.fillText (al +'/100', cw*.5, ch*.5+2, cw);
  ctx.beginPath();
  ctx.arc(100, 95, 90, start, diff/10+start, false);
  ctx.stroke();
  if(al>=75){
    clearTimeout(sim);
  }
  al++;
}
var sim = setInterval (progressSim, 50);
