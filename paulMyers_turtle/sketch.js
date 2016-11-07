// TURTLE GRAPHICS
// https://en.wikipedia.org/wiki/Turtle_graphics
// 
// this p5 sketch does a simple implementation of Seymour Papert's
// 'turtle graphics' package for LOGO.  using key commands, you can
// drive a turtle as it draws on the screen.
// 
// your tasks:
// (1) make the drawing system that the turtle drives around
// more interesting.  you can change the way lines work; you
// can have it plop down images instead of shapes; you can 
// have it set vertex points for shapes.
// (2) expand the turtle's vocabulary so it understands more 
// symbols than +, -, and F.  for example, a standard turtle
// typically will use lowercase 'f' for a move that *doesn't*
// draw (e.g. to leave a space).  it will also allow for branching
// symbols such as '[' and ']' so that the turtle can go on an
// expedition and 'teleport' back when a branch closes.  a simple
// thought would be to have the 'C' key change the turtle's drawing
// color.
// (3) find a way to make the turtle draw *automatically*, using
// the same system.  see the next sketch for an example of how that
// might be done.  :)

var x = [];
var y = [];
var angleArray = [];// some variables for the current position of the turtle
var distance = 3; // how many pixels do we move forward when we draw?
var angle = 45; // how many degrees do we turn with '+' and '-'

var string = 'FFF-F[d+FFF[ddFFFF]-ggg-FFF]g+F';
var pos = 0;
var buffer = 5;

function setup()
{
  createCanvas(800, 600);
  
  // start our turtle in the middle of the screen
  x = [width/2];
  y = [height/2];
  angleArray = [270];
  background(255);
}

function draw()
{
  var c = string.charAt(pos);
  turtle(c);
  pos = (pos+1) % string.length;
}


//turtle function taken from the autodrive example in class. I tried using other methods, but all of them seemed to either break the entire program or
//would create only a small circle that didn't move. In the end, I elected for this/
function turtle(k) {
  // draw the stuff:
  var curstack = x.length-1;
  if(k=='F') {
  	stroke(0);
  	var x1 = x[curstack] + distance*cos(radians(angleArray[curstack]));
  	var y1 = y[curstack] + distance*sin(radians(angleArray[curstack]));
  	line(x[curstack], y[curstack], x1, y1);
  	stroke(random(255), random(255), random(255));
  	ellipse(x[curstack] + buffer, y[curstack] + buffer, distance/2, distance/2);
  	ellipse(x[curstack] + buffer, y[curstack] - buffer, distance/2, distance/2);
  	stroke(random(255), random(255), random(255), random(25));
  	ellipse(x[curstack], y[curstack], distance/2, distance/2);
  	stroke(random(255), random(255), random(255));
  	ellipse(x[curstack] - buffer, y[curstack] + buffer, distance/2, distance/2);
  	ellipse(x[curstack] - buffer, y[curstack] - buffer, distance/2, distance/2);
  	//the ordering creates depth
  	x[curstack] = x1;
  	y[curstack] = y1;
  	buffer += .25;
  }
  else if(k=='+') angleArray[curstack]+=angle;
  else if(k=='-') angleArray[curstack]-=angle;
  else if(k=='g'){
  	if(angle < 355) angle+= 5; else angle = 0
  }
  else if(k=='d'){
  	if(angle > 5) angle -=5; else angle = 360;
	}
	else if(k=='[')
	{
		x[curstack+1] = x[curstack];
		y[curstack+1] = y[curstack];
		angleArray[curstack+1] = angleArray[curstack];
	}
	else if(k==']')
	{
		x.pop();
		y.pop();
		angleArray.pop();
	}
	else if(k=='C') background(255);
}

/*function keyTyped()
{
  console.log(key); // what key did we type?
  
  if(key=='F') // draw forward
  {
    // polar to cartesian transformation based on step and currentangle:
    var x1 = x + step*cos(radians(currentangle));
    var y1 = y + step*sin(radians(currentangle));
    line(x1, y1, x1+5, y1+5);
    line(x1, y1, x1-5, y1-5);
    line(x1, y1, x1+5, y1-5);
    line(x1, y1, x1-5, y1+5);// connect the old and the new
    // update the turtle's position:
    x = x1;
    y = y1;
  }
  else if(key=='+')
  {
   currentangle+=angle; // turn left
  }
  else if(key=='-')
  {
   currentangle-=angle; // turn right   
  }
  else if(key=='g')
  {
  	if (angle<355) angle += 5; else angle = 0;
  }
  else if(key=='d')
  {
  	if(angle>5) angle -= 5; else angle = 360;
  }
  
}
}
*/