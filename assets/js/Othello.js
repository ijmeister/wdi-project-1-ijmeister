var PLAYER_1 = 'BLACK'
var PLAYER_2 = 'WHITE'

Othello = function () {
  this.tiles = []
  this.tileCount = 0
  this.playerTurn = PLAYER_1
}

Othello.prototype.initiateGame = function (row = 8, col = 8) {
  /**
   * create 2 dimensional array 8 x 8
   */
  for (var x = 0; x < row; x++) {
    this.tiles[ x ] = []
    for (var y = 0; y < col; y++) {
      this.tiles[ x ][ y ] = null
    }
  }
  this.tiles[ 3 ][ 3 ] = PLAYER_2
  this.tiles[ 3 ][ 4 ] = PLAYER_1
  this.tiles[ 4 ][ 3 ] = PLAYER_1
  this.tiles[ 4 ][ 4 ] = PLAYER_2
}

Othello.prototype.processClick = function (moveIndex, playerId) {
  /**
   * reverse the tiles if it is a valid move
   * return ture if successful, else false
   */
}

Othello.prototype.reverseTiles = function (fromIndex, toIndex, direction ) {
  /**
   *  reverse the tiles inbetween
   */
}

Othello.prototype.checkIndenticalTileExists = function (fromIndex, toIndex, playerid) {
  /**
   *
   */
}

Othello.prototype.isValidMove = function (moveIndex, playerId) {
  /**
   * Check if move is valid
   * return true or false
   */
}

Othello.prototype.isGameOver = function () {
  /**
   * Check if game over,
   * if true return the winner, else false
   */
}

Othello.prototype.isPlayer1Turn = function () {

};

module.exports = Othello
