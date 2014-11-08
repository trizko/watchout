// start slingin' some d3 here.

var width = 700;
var height = 450;

//Define d3 canvas
var svg = d3.select("body").append("svg")
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
      .attr("r", 10)



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

//Create Player
var playerData = [0];
var player = svg.selectAll('.player')
      .data(playerData);

player.enter().append("circle")
      .attr("class", "player")
      .attr("cx", width/2 - 50)
      .attr("cy", height/2 - 10)
      .attr("r", 10)
      .call(drag);
