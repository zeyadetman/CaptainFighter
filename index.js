var map=[
  [0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,3],
  [0,1,1,0,0,0,0,0,0,0,2,0,0,1,2,0,0,1,2,0,0,1,2,0,0,1],
  [1,2,0,2,2,0,0,1,0,0,0,0,0,0,2,0,0,1,2,0,0,2,2,0,0,2],
  [0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,1,1,0,0,0,0,0,0,0,2,0],
  [1,0,2,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
  [0,0,0,2,0,0,1,0,1,0,2,0,0,0,0,0,0,2,0,0,1,2,0,0,0,2],
  [0,0,0,2,0,0,0,1,0,0,0,1,0,2,0,0,1,2,0,0,0,2,0,2,1,0],
  [0,0,0,0,1,0,0,2,0,0,2,1,0,0,2,1,0,0,0,0,0,0,0,2,0,0],
  [0,0,1,2,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,1,1,0,0,0,0],
  [2,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,2,0,0,0,1,0,0,0,1],
  [0,0,0,1,0,0,0,2,0,0,2,0,0,0,2,1,0,0,0,2,1,0,0,0,1,2]
];

var gameMovers = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

var size = 45;
var water = 0;
var island = 1;
var pirate = 2;
var home = 3;
var ship = 4;
var shipRow;
var shipColumn;

var gameBody = document.querySelector('#gameBody');
for (var i = 0; i < gameMovers.length; i++) {
  for (var j = 0; j < gameMovers[i].length; j++) {
    if(gameMovers[i][j] == ship) {
      shipRow = i;
      shipColumn = j;
      break;
    }
  }
}

for (var i = 0; i < map.length; i++) {
  for(var j = 0; j < map[i].length; j++) {
    var cell = document.createElement("img");
    cell.setAttribute("class","cells");
    gameBody.appendChild(cell);
    if(map[i][j] == 0) cell.src = "water.png";
    else if(map[i][j] == 1) cell.src = "island.png";
    else if(map[i][j] == 2)cell.src = "pirate.png";
    else if(map[i][j] == 3)cell.src = "home.png";

    if(i==shipRow && j==shipColumn) cell.src = "ship.png";
    cell.style.top = i*size + "px";
    cell.style.left = j*size + "px";
  }
}


var food = 70;
var gold = 70;
var shipFood = document.querySelector('#food');
var shipGold = document.querySelector('#gold');
var state = document.querySelector('#state');

function render(){
  for (var i = 0; i < map.length; i++) {
    for(var j = 0; j < map[i].length; j++) {
      var cell = document.createElement("img");
      cell.setAttribute("class","cells");
      gameBody.appendChild(cell);
      if(map[i][j] == 0) cell.src = "water.png";
      else if(map[i][j] == 1) cell.src = "island.png";
      else if(map[i][j] == 2) cell.src = "pirate.png";
      else if(map[i][j] == 3) cell.src = "home.png";

      if(i==shipRow && j==shipColumn) {
        cell.src = "ship.png";

        if(map[i][j] == 0) state.innerHTML = "The ship is on Sea.";
        else if(map[i][j] == 1) state.innerHTML = "The ship is on Island.";
        else if(map[i][j] == 2) state.innerHTML = "The ship is Fighting.";
        else if(map[i][j] == 3) state.innerHTML = "The ship is Safe.";

              if((j+i)%2==1 && map[i][j]==1) food-=10;
              else if ((j+i)%2==0 && map[i][j]==1) food+=5;
              else if ((j+i)%2==1 && map[i][j]==1) food-=10;
              else if ((j+i)%2==0 && map[i][j]==1) food+=5;
              if((j+i)%2==1 && map[i][j]==2) gold-=10;
              else if ((j+i)%2==0 && map[i][j]==2) gold+=5;
              else if ((j+i)%2==1 && map[i][j]==2) gold-=15;
              else if ((j+i)%2==0 && map[i][j]==2) gold+=5;

    }


      shipFood.innerHTML = food;
      shipGold.innerHTML = gold;
      cell.style.top = i*size + "px";
      cell.style.left = j*size + "px";


      if( (i == shipRow && j == shipColumn && map[i][j] == 3) || (food <=0 || gold<=0)){
        endGame();
      }
    }
  }

}


window.addEventListener('keydown', keyHandler, false);

function keyHandler(event){
  if(event.keyCode == 38 && shipRow>0) {gameMovers[shipRow][shipColumn] = 0; shipRow--; gameMovers[shipRow][shipColumn] = ship;}
  else if(event.keyCode == 40 && shipRow < map.length-1) {gameMovers[shipRow][shipColumn] = 0; shipRow++; gameMovers[shipRow][shipColumn] = ship;}
  else if(event.keyCode == 39 && shipColumn < map[0].length-1 ) {gameMovers[shipRow][shipColumn] = 0; shipColumn++; gameMovers[shipRow][shipColumn] = ship;}
  else if(event.keyCode == 37 && shipColumn>0) {gameMovers[shipRow][shipColumn] = 0; shipColumn--; gameMovers[shipRow][shipColumn] = ship;}
  render();
}
var message = document.querySelector('#message');
function endGame(){
  if(gold <= 0 || food <= 0) message.innerHTML = " You failed to fight";
  else message.innerHTML = "Great Job! You're safe :)";
  window.removeEventListener("keydown", keyHandler, false);
}
