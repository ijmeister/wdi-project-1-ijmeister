var PLAYER_1 = 'BLACK'
var PLAYER_2 = 'WHITE'
var NO_ROW = 8
var NO_COL = 8
var DIRECTIONS_MOVE_MAP = {
  // 8 directions with x,y coordinate map - North, East, South, West, NE, NW, SE, SW
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

  // preset the default state of the game
  this.tiles[ 3 ][ 3 ] = PLAYER_2
  this.tiles[ 3 ][ 4 ] = PLAYER_1
  this.tiles[ 4 ][ 3 ] = PLAYER_1
  this.tiles[ 4 ][ 4 ] = PLAYER_2
}

Othello.prototype.availableMoves = function () {
  /**
   * Goes through all the tiles and return all the available moves of current player
   *
   */
  var okayMoves = []
  for (var x = 0; x < NO_ROW; x++) {
    for (var y = 0; y < NO_COL; y++) {
      // check getValidDirections for each tile
      // if exists, check checkIdenticalTileExists for each direction returned from getValidDirections
      if (this.tiles[ x ][ y ] === null) {
        var directions = this.getValidDirections([x, y])
        if (directions) {
          directions.forEach(function (direction) {
            if (this.checkIdenticalTileExists([x, y], direction)) {
              okayMoves.push([ x, y ])
            }
          }.bind(this))
        }
      }
    }
  }
  return okayMoves
}

Othello.prototype.reverseTiles = function (fromIndex, toIndex, direction) {
  /**
   *  reverse the tiles in between fromIndex and toIndex, as per given direction,
   *  fromIndex is the [x,y] array which the player has made his move for the current turn
   *  toIndex is the [x,y] array till which the tiles will be flipped
   */
  var xIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'x' ]
  var yIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'y' ]
  var newX = fromIndex[ 0 ]
  var newY = fromIndex[ 1 ]
  var toX = toIndex[ 0 ]
  var toY = toIndex[ 1 ]
  while (newX !== toX || newY !== toY) {
    if (this.tiles[ newX ][ newY ] !== this.currentPlayer()) {
      this.tiles[ newX ][ newY ] = this.currentPlayer()
    }
    newX += xIncrement
    newY += yIncrement
  }
}

Othello.prototype.checkIdenticalTileExists = function (moveIndex, direction) {
  /**
   * return index if it can find an identical tile along the given direction
   * and there is no blank tile in between
   * else false
   */
  var xIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'x' ]
  var yIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'y' ]
  var newX = moveIndex[ 0 ] + xIncrement
  var newY = moveIndex[ 1 ] + yIncrement
  // check index for out of bounds
  // traverse along the given direction with coordinates from the direction map
  while (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
    // must not have any empty tiles along the direction
    if (this.tiles[ newX ][ newY ] === null) { return false }
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
   *  if yes, return directions as an array
   *  else false
   */
  var opposingTile = this.nextPlayer()
  var matchedDirs = []
  var x = moveIndex[ 0 ]
  var y = moveIndex[ 1 ]
  var xIncrement
  var yIncrement
  // check for all 8 directions around the move index
  // loop through each key in the direction map
  for (var dir in DIRECTIONS_MOVE_MAP) {
    xIncrement = DIRECTIONS_MOVE_MAP[ dir ][ 'x' ]
    yIncrement = DIRECTIONS_MOVE_MAP[ dir ][ 'y' ]
    // making sure the index stays in board during traversing
    if (x + xIncrement >= 0 && y + yIncrement >= 0 && x + xIncrement < 8 && y + yIncrement < 8) {
      if (this.tiles[ x + xIncrement ][ y + yIncrement ] === opposingTile) {
        matchedDirs.push(dir)
      }
    }
  }
  return matchedDirs
}

Othello.prototype.isValidMove = function (moveIndex) {
  /**
   * Check if move is valid
   * if there's an opposing tile in between the specific move and any identical tile in the same row, column or diagonal
   * return true or false
   */
  if (this.tiles[ moveIndex[ 0 ] ][ moveIndex[ 1 ] ] === null) {
    var availableMoves = this.availableMoves()
    for (var i = 0; i < availableMoves.length; i++) {
      if (availableMoves[ i ][ 0 ] === moveIndex[ 0 ] && availableMoves[ i ][ 1 ] === moveIndex[ 1 ]) {
        return true
      }
    }
  }
  return false
}

Othello.prototype.isGameOver = function () {
  /**
   * Check if game over
   * 1. if all the tiles on the board have been filled
   * 2. if there's no more available moves for current player as well as the next player
   * NOTE: calling the function when there's no more available moves for the currnt player will trigger the auto-turn
   */
  var flattenedTiles = this.getFlattenedTilesArray()
  if (flattenedTiles.filter(ele => ele !== null).length === 64) {
    return true
  }
  if (!this.availableMoves().length) {
    this.switchTurn()
    if (!this.availableMoves().length) {
      return true
    }
  }
  return false
}

Othello.prototype.getScoreArray = function () {
  /**
   * get the score as an array [10, 20] => player1 - 10 and player2 - 20
   */
  var flattenedTiles = this.getFlattenedTilesArray()
  var p1Score = flattenedTiles.filter(ele => ele === PLAYER_1)
  var p2Score = flattenedTiles.filter(ele => ele === PLAYER_2)
  return [ p1Score.length, p2Score.length ]
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

Othello.prototype.getFlattenedTilesArray = function () {
  /**
   * convert 2D [ 8 x 8 ] tiles to 1D [ 64 ] Array
   */
  return this.tiles.reduce(function (prev, ele) {
    return prev.concat(ele)
  }, [])
}

Othello.prototype.whoWon = function () {
  var scoreArr = this.getScoreArray()
  if (scoreArr[ 0 ] > scoreArr[ 1 ]) {
    return PLAYER_1
  } else {
    return PLAYER_2
  }
}

module.exports = Othello

// module.exports = Othello
