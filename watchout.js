// start slingin' some d3 here.

var game = {
  high : 0,
  current: 0,
  collisions: 0
}

var width = 700;
var height = 450;
var radius = 10;

//Define d3 canvas
var svg = d3.select("body").append('div').attr("class", "container").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")

//Dragging functions
var drag = d3.behavior.drag()
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}


//Create enemies
var enemyData = [];

for(var i = 0; i < 30; i++){
  enemyData.push(i);
}

var update = function(enemyData){
  var enemies = svg.selectAll('.asteroid')
      .data(enemyData, function(d){ return d; });

  enemies.enter().append("circle")
      .attr("class", "asteroid")
      .attr("cx", function(d, i){
        return Math.floor(Math.random()*width);
      })
      .attr("cy", function(d, i){
        return Math.floor(Math.random()*height);
      })
      .attr("r", radius)



  enemies.attr("class", "asteroid")
        .transition()
        .duration(2000)
        .attr("cx", function(d, i){
        return Math.floor(Math.random()*width);
        })
        .attr("cy", function(d, i){
          return Math.floor(Math.random()*height);
        });

};

//Start enemy movement
update(enemyData);

setInterval(function(){
  update(enemyData);
},2000);

var updateScores = function(cls){
  var element = document.getElementsByClassName(cls)[0].children[0];
  element.innerHTML = game[cls].toString();
}

var collisions = function(){
  var enemyArray = svg.selectAll(".asteroid")[0];
  var player = svg.selectAll(".player")[0][0];

  var playerR = player['r']['animVal']['value'];
  var playerX = parseFloat(player['cx']['animVal']['value']);
  var playerY = parseFloat(player['cy']['animVal']['value']);

  for(var i = 0; i < enemyArray.length; i++){
    var enemyR = radius;
    var enemyX = parseFloat(enemyArray[i]['cx']['animVal']['value']);
    var enemyY = parseFloat(enemyArray[i]['cy']['animVal']['value']);

    radiusSum = enemyR + playerR;
    xDiff = enemyX - playerX;
    yDiff = enemyY - playerY;

    separation = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
    if(separation < radiusSum){
      if(game.high < game.current){
        game.high = game.current;
        updateScores("high");
      }
      game.current = 0;
      updateScores("current");
      game.collisions++;
      updateScores("collisions");
      console.log("this is a hit");
    }

  }
}

setInterval(function(){
  collisions();
  game.current++;
  updateScores('current');
},200);

//Create Player
var playerData = [0];
var player = svg.selectAll('.player')
      .data(playerData);

player.enter().append("circle")
      .attr("class", "player")
      .attr("cx", width/2)
      .attr("cy", height/2)
      .attr("r", radius)
      .call(drag);
