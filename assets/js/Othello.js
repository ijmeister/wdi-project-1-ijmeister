var PLAYER_1 = 'BLACK'
var PLAYER_2 = 'WHITE'
var NO_ROW = 8
var NO_COL = 8
var DIRECTIONS_MOVE_MAP = {
  'N': {
    'x': -1,
    'y': 0
  },
  'S': {
    'x': 1,
    'y': 0
  },
  'E': {
    'x': 0,
    'y': 1
  },
  'W': {
    'x': 0,
    'y': -1
  },
  'NE': {
    'x': -1,
    'y': 1
  },
  'SE': {
    'x': 1,
    'y': 1
  },
  'NW': {
    'x': -1,
    'y': -1
  },
  'SW': {
    'x': 1,
    'y': -1
  }
}

var Othello = function () {
  this.tiles = []
  this.tileCount = 0
  this.turnCount = 0
}

Othello.prototype.initiateGame = function (rowNo = NO_ROW, colNo = NO_COL) {
  /**
   * create 2 dimensional array 8 x 8
   */
  for (var x = 0; x < rowNo; x++) {
    this.tiles[ x ] = []
    for (var y = 0; y < colNo; y++) {
      this.tiles[ x ][ y ] = null
    }
  }
  this.tiles[ 3 ][ 3 ] = PLAYER_2
  this.tiles[ 3 ][ 4 ] = PLAYER_1
  this.tiles[ 4 ][ 3 ] = PLAYER_1
  this.tiles[ 4 ][ 4 ] = PLAYER_2
}

Othello.prototype.processClick = function (moveIndex) {
  /**
   * reverse the tiles if it is a valid move
   * return ture if successful, else false
   */
}

Othello.prototype.availableMoves = function () {
  /**
   * Return all the available moves of current player
   */
  var okayMoves = []
  for (var x = 0; x < NO_ROW; x++) {
    for (var y = 0; y < NO_COL; y++) {
      // check checkIdenticalTileExists for each tile
      // if exists, check checkIdenticalTileExists for each direction returned from checkIdenticalTileExists
      var directions = this.getValidDirections([x, y])
      if (directions) {
        // console.log(x, y)
        // console.log(directions)
        directions.forEach(function (direction) {
          if (this.checkIdenticalTileExists([x, y], direction)) {
            okayMoves.push([ x, y ])
          }
        }.bind(this))
      }
    }
  }
  // console.log(okayMoves)
  return okayMoves
}

Othello.prototype.reverseTiles = function (fromIndex, toIndex, direction) {
  /**
   *  reverse the tiles in between fromIndex and toIndex, as per given direction
   */
  var xIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'x' ]
  var yIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'y' ]
  var newX = fromIndex[ 0 ]
  var newY = fromIndex[ 1 ]
  var toX = toIndex[ 0 ]
  var toY = toIndex[ 1 ]
  // console.log(newX, newY)
  // console.log(toX, toY)
  while (newX !== toX || newY !== toY) {
    if (this.tiles[ newX ][ newY ] !== this.currentPlayer()) {
      this.tiles[ newX ][ newY ] = this.currentPlayer()
      // console.log('change (' + newX + ',' + newY + ') to ' + this.playerTurn)
    }
    newX += xIncrement
    newY += yIncrement
  }
  // console.log(this.tiles)
}

Othello.prototype.checkIdenticalTileExists = function (moveIndex, direction) {
  /**
   * return index if it can find an identical tile along the given direction
   * else false
   */
  var xIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'x' ]
  var yIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'y' ]
  var newX = moveIndex[ 0 ] + xIncrement
  var newY = moveIndex[ 1 ] + yIncrement
  while (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
    // console.log(this.tiles[ newX ][ newY ], newX, newY)
    if (this.tiles[ newX ][ newY ] === this.currentPlayer()) {
      return [ newX, newY ]
    }
    newX += xIncrement
    newY += yIncrement
  }
  return false
}

Othello.prototype.getValidDirections = function (moveIndex) {
  /**
   *  moveIndex = [1,2] => move to (x,y) / (1,2)
   *  check if intended move index has any adjacent opposing tiles,
   *  return directions which do as above as an array
   */
  var opposingTile = this.nextPlayer()
  var matchedDirs = []
  var x = moveIndex[ 0 ]
  var y = moveIndex[ 1 ]
  var xIncrement
  var yIncrement
  for (var dir in DIRECTIONS_MOVE_MAP) {
    xIncrement = DIRECTIONS_MOVE_MAP[ dir ][ 'x' ]
    yIncrement = DIRECTIONS_MOVE_MAP[ dir ][ 'y' ]
    if (x + xIncrement >= 0 && y + yIncrement >= 0 && x + xIncrement < 8 && y + yIncrement < 8) {
      if (this.tiles[ x + xIncrement ][ y + yIncrement ] === opposingTile) {
        matchedDirs.push(dir)
      }
    }
  }
  // console.log(matchedDirs)
  return matchedDirs
}

Othello.prototype.isValidMove = function (moveIndex) {
  /**
   * Check if move is valid
   * if there's an opposing tile in between the specific move and any identical tile in the same row, column or diagonal
   * return true or false
   */
  var availableMoves = this.availableMoves()
  for (var i = 0; i < availableMoves.length; i++) {
    // console.log(availableMoves[ i ][ 0 ] === moveIndex[ 0 ])
    // console.log(availableMoves[ i ][ 1 ] === moveIndex[ 1 ])
    if (availableMoves[ i ][ 0 ] === moveIndex[ 0 ] && availableMoves[ i ][ 1 ] === moveIndex[ 1 ]) {
      return true
    }
  }
  // .forEach(function (availMove) {
  //   //console.log(availMove, moveIndex)
  //   console.log(availMove[ 0 ] === moveIndex[ 0 ])
  //   console.log(availMove[ 1 ] === moveIndex[ 1 ])
  //   if (availMove[ 0 ] === moveIndex[ 0 ] && availMove[ 1 ] === moveIndex[ 1 ]) {
  //     return true
  //   }
  // })
  return false
}

Othello.prototype.isGameOver = function () {
  /**
   * Check if game over,
   * if true return the winner, else false
   */
}

Othello.prototype.nextPlayer = function () {
  return this.currentPlayer() === PLAYER_1 ? PLAYER_2 : PLAYER_1
}

Othello.prototype.currentPlayer = function () {
  return this.turnCount % 2 === 0 ? PLAYER_1 : PLAYER_2
}

Othello.prototype.switchTurn = function () {
  this.turnCount++
}

module.exports = Othello
