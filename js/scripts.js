



// this is the progresss circle


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
