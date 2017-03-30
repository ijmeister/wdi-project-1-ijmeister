/**
 * NOTE: To make sure Game lib script (Othello.js) is preloaded before this script
 */

document.addEventListener('DOMContentLoaded', function () {
  // code and events go here
  var grid = document.querySelector('.grid')
  var img
  var game = new Othello()

  /**
   * Restart button to refresh the page.
   */
  document.querySelector('.myButton').addEventListener('click', function () {
    window.location.reload(true)
  })

  /**
   * Call the game api and create the initial board in UI
   */
  game.initiateGame()
  createBoard()

  function createBoard () {
    /**
     * Create each tile as div box
     * setting id and default position of the pieces
     * 4 pieces at the center of the board prepopulated with 2 pieces each for black and white
     */
    var boxDiv
    for (var i = 0; i < game.tiles.length; i++) {
      for (var j = 0; j < game.tiles[i].length; j++) {
        boxDiv = document.createElement('div')
        boxDiv.id = 'box_' + i + '_' + j
        boxDiv.classList.add('box')
        if (game.tiles[ i ][ j ] !== null) {
          img = document.createElement('img')
          img.src = 'assets/images/' + game.tiles[ i ][ j ].toLowerCase() + '.png'
          img.classList.add('filledBox')
          boxDiv.appendChild(img)
        }

        // add Event listeners
        // 1. when the user clicks, send the moveIndex to game controller.
        // 2/3. when the user hovers over the empty space, it tells the user whether user can make the move in that tile
        boxDiv.addEventListener('click', processClick)
        boxDiv.addEventListener('mouseenter', showSilhouette)
        boxDiv.addEventListener('mouseleave', removeSilhouette)
        grid.appendChild(boxDiv)
      }
    }
  }

  function processClick () {
    /**
     * 1. Checks if the move is valid.
     * 2. if yes, reverse the tiles/ flipped white to black, vice versa
     * 3. Switch the turn after the valid move.
     * 4. Auto-Switch the turn if there is no available move for the next player.
     * 5. Display the updated score report in UI
     * 6. Check for game over condition, if yes, display the winner in UI
     */
    removeSilhouette.call(this) // remove the silhouette first

    // only if the tile is empty, go ahead with the logic
    // TODO: refactor the game api to not rerun the same code
    if (!this.querySelector('img.filledBox')) {
      var moveIndex = [ parseInt(this.id.split('_')[ 1 ]), parseInt(this.id.split('_')[ 2 ]) ]
      var directions
      if (game.isValidMove(moveIndex)) {
        directions = game.getValidDirections(moveIndex)
        directions.forEach(function (direction) {
          var toIndex = game.checkIdenticalTileExists(moveIndex, direction)
          if (toIndex) {
            // in UI, flip the tiles
            reverseDivBoxes(moveIndex, toIndex, direction)
            // reverse the tiles in game object.
            game.reverseTiles(moveIndex, toIndex, direction)
          }
        })

        // switch the turn, update UI's turn indicator
        game.switchTurn()
        switchPlayerDisplay()

        // update score report.
        updateScore(game.getScoreArray())

        // if there's no more available moves for next player, auto switch turn.
        // if game's over, show who's winner, When it called the game
        if (!game.availableMoves().length) {
          if (game.isGameOver()) {
            // all board filled or no moves available for both players
            var newScore = game.getScoreArray()
            var winner = game.whoWon() === PLAYER_1 ? 'player1' : 'player2'
            var loser = winner === 'player1' ? 'player2' : 'player1'
            // if all times in the game board have been filled
            if (game.getFlattenedTilesArray().length === 64) {
              updateScore(newScore)
              callSweetAlert(winner.toUpperCase() + ' Wins! Score: ' + newScore[ 0 ] + ' - ' + newScore[ 1 ])
            } else {
              // the game board has not been fully filled, but no more available moves for both players, the game will end with the current score.
              updateScore(newScore)
              callSweetAlert('No More available Moves. ' + winner.toUpperCase() + ' Wins! Score: ' + newScore[ 0 ] + ' - ' + newScore[ 1 ])
            }
            // Update in UI to indicate winner.
            document.querySelector('div.pointer.' + winner + ' img').src = 'assets/images/winner.png'
            document.querySelector('div.pointer.' + winner).style.display = 'block'
            document.querySelector('div.pointer.' + loser).style.display = 'none'
          } else {
            // When isGameOver() was called, turn was auto-switched, Update Turn in UI needs to be called again to be in sync with the game progress.
            switchPlayerDisplay()
            callSweetAlert('No more available moves for ' + game.nextPlayer() + '. Turn was auto-switched.')
          }
        }
      }
    }
  }

  function showSilhouette () {
    /**
     * show silhouette when the user hovers over the empty tile and it is a valid move.
     */
    if (!this.querySelector('img') || !this.querySelector('img.dimmy')) {
      // box id is in format 'box_x_y'/'box_1_1'
      var moveIndex = [ parseInt(this.id.split('_')[ 1 ]), parseInt(this.id.split('_')[ 2 ]) ]
      if (game.isValidMove(moveIndex)) {
        img = document.createElement('img')
        img.classList.add('dimmy')
        img.src = 'assets/images/' + game.currentPlayer().toLowerCase() + '.png'
        this.appendChild(img)
      }
    }
  }

  function removeSilhouette () {
    /**
     * remove the silhouette when the user moves out from the empty cell
     */
    if (this.querySelector('img.dimmy')) {
      this.removeChild(this.querySelector('img.dimmy'))
    }
  }

  function reverseDivBoxes (fromIndex, toIndex, direction) {
    /**
     *  UI update: flip all the box divs from the fromIndex to toIndex in the given direction.
     */
    var xIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'x' ]
    var yIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'y' ]
    var newX = fromIndex[ 0 ]
    var newY = fromIndex[ 1 ]
    var toX = toIndex[ 0 ]
    var toY = toIndex[ 1 ]
    while (newX !== toX || newY !== toY) {
      if (game.tiles[ newX ][ newY ] !== game.currentPlayer()) {
        flipImage.call(document.querySelector('#box_' + newX + '_' + newY))
      }
      newX += xIncrement
      newY += yIncrement
    }
  }

  function flipImage () {
    /**
     *  changing the image from black to white for existing tiles, vice versa
     *  for empty tile, will create a new image with the current player colour
     */
    if (this.querySelector('img.filledBox')) {
      var imageToflip = this.querySelector('img.filledBox')
      if (imageToflip.src.split('/').reverse()[0] === 'white.png') {
        imageToflip.src = 'assets/images/black.png'
      } else {
        imageToflip.src = 'assets/images/white.png'
      }
    } else {
      img = document.createElement('img')
      img.src = 'assets/images/' + game.currentPlayer().toLowerCase() + '.png'
      img.classList.add('filledBox')
      this.appendChild(img)
    }
  }

  function switchPlayerDisplay () {
    /**
     * toggle display between the player pointer
     */
    if (game.currentPlayer() === PLAYER_1) {
      document.querySelector('div.pointer.player2').style.display = 'none'
      document.querySelector('div.pointer.player1').style.display = 'block'
    } else {
      document.querySelector('div.pointer.player1').style.display = 'none'
      document.querySelector('div.pointer.player2').style.display = 'block'
    }
  }

  function updateScore (newScore) {
    /**
     * Update the score on UI
     */
    document.querySelector('.score').textContent = newScore[ 0 ] + ' - ' + newScore[ 1 ]
  }

  function callSweetAlert (aMessage) {
    /**
     * Helper alert function (SweetAlert2 Api) to display cool messages.
     * <script src="https://cdn.jsdelivr.net/sweetalert2/6.4.4/sweetalert2.min.js"></script>
     */
    swal({
      text: aMessage,
      timer: 5000
    }).then(
      function () {},
      // handling the promise rejection
      function (dismiss) {
      }
    )
  }
})
