document.addEventListener('DOMContentLoaded', function () {
  // code and events go here
  var grid = document.querySelector('.grid')
  var img
  var game = new Othello()

  game.initiateGame()
  createBoard()

  function createBoard () {
    var boxDiv
    for (var i = 0; i < game.tiles.length; i++) {
      for (var j = 0; j < game.tiles[i].length; j++) {
        boxDiv = document.createElement('div')
        boxDiv.id = 'box_' + i + '_' + j
        boxDiv.classList.add('box')
        if ((j + i) % 2) {
          boxDiv.classList.add('boxColor1')
        } else {
          boxDiv.classList.add('boxColor2')
        }
        if (game.tiles[ i ][ j ] !== null) {
          img = document.createElement('img')
          img.src = 'assets/images/' + game.tiles[ i ][ j ].toLowerCase() + '.png'
          img.classList.add('filledBox')
          boxDiv.appendChild(img)
        }
        boxDiv.addEventListener('click', processClick)
        boxDiv.addEventListener('mouseenter', showSilhouette)
        boxDiv.addEventListener('mouseleave', removeSilhouette)
        grid.appendChild(boxDiv)
      }
    }
  }

  function processClick () {
    // alert(this.id.split('_')[1] + ',' + this.id.split('_')[2])
    // check for all the avaialble moves and if it's in there show the hover effect
    // var moveIndex = [ parseInt(this.id.split('_')[ 1 ]), parseInt(this.id.split('_')[ 2 ]) ]
    removeSilhouette.call(this)
    if (!this.querySelector('img.filledBox')) {
      // console.log('can move')
      var moveIndex = [ parseInt(this.id.split('_')[ 1 ]), parseInt(this.id.split('_')[ 2 ]) ]
      var directions
      // var currentPlayer = game.currentPlayer()
      if (game.isValidMove(moveIndex)) {
        directions = game.getValidDirections(moveIndex)
        directions.forEach(function (direction) {
          var toIndex = game.checkIdenticalTileExists(moveIndex, direction)
          if (toIndex) {
            // console.log('reverse tiles from ' + moveIndex + ' to ' + toIndex + '')
            // setImage.call(this)
            reverseDivBoxes(moveIndex, toIndex, direction)
            game.reverseTiles(moveIndex, toIndex, direction)
          }
        })
        game.switchTurn()
        switchPlayerDisplay()
        updateScore(game.getScoreArray())
        // if there's no more available moves for next player, auto switch turn.
        // if game's over, show who's winner
        if (!game.availableMoves().length) {
          if (game.isGameOver()) {
            // all board filled or no moves available for both players
            var newScore = game.getScoreArray()
            var winner = game.whoWon() === PLAYER_1 ? 'p1' : 'p2'
            if (game.getFlattenedTilesArray().length === 64) {
              updateScore(newScore)
              alert(game.whoWon() + ' Wins! Score: ' + newScore[ 0 ] + ' - ' + newScore[ 1 ])
              document.querySelector('div.pointer.' + winner).querySelector('img').src = 'assets/images/winner.png'
            } else {
              updateScore(newScore)
              alert('No More available Moves. ' + game.whoWon() + ' Wins! Score: ' + newScore[ 0 ] + ' - ' + newScore[ 1 ])
              document.querySelector('div.pointer.' + winner).querySelector('img').src = 'assets/images/winner.png'
            }
          } else {
            // turn was auto switched due to no avilable moves
            // auto-turning was triggerred when it checked for isGameOver()
            alert('No more available moves for ' + game.nextPlayer() + '. Turn was auto-switched.')
          }
        }
      }
    }
  }

  function showSilhouette () {
    if (!this.querySelector('img') || !this.querySelector('img.dimmy')) {
      var moveIndex = [ parseInt(this.id.split('_')[ 1 ]), parseInt(this.id.split('_')[ 2 ]) ]
      if (game.isValidMove(moveIndex)) {
        // console.log(moveIndex + 'is a valid move.')
        img = document.createElement('img')
        img.classList.add('dimmy')
        img.src = 'assets/images/' + game.currentPlayer().toLowerCase() + '.png'
        this.appendChild(img)
      }
    }
  }

  function removeSilhouette () {
    if (this.querySelector('img.dimmy')) {
      this.removeChild(this.querySelector('img.dimmy'))
    }
  }

  function reverseDivBoxes (fromIndex, toIndex, direction) {
    var xIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'x' ]
    var yIncrement = DIRECTIONS_MOVE_MAP[ direction ][ 'y' ]
    var newX = fromIndex[ 0 ]
    var newY = fromIndex[ 1 ]
    var toX = toIndex[ 0 ]
    var toY = toIndex[ 1 ]
    // console.log(newX, newY)
    // console.log(toX, toY)
    while (newX !== toX || newY !== toY) {
      if (game.tiles[ newX ][ newY ] !== game.currentPlayer()) {
        setImage.call(document.querySelector('#box_' + newX + '_' + newY))
        // game.tiles[ newX ][ newY ] = game.currentPlayer()
        // console.log('change (' + newX + ',' + newY + ') to ' + this.playerTurn)
      }
      newX += xIncrement
      newY += yIncrement
    }
  }

  function setImage () {
    // console.log(this)
    if (this.querySelector('img.filledBox')) {
      var imageToflip = this.querySelector('img.filledBox')
      if (imageToflip.src.split('/').reverse()[0] === 'white.png') {
        imageToflip.src = 'assets/images/black.png'
      } else {
        imageToflip.src = 'assets/images/white.png'
      }
    } else {
      // console.log('is blank')
      img = document.createElement('img')
      // img.src = 'assets/images/black.png'
      img.src = 'assets/images/' + game.currentPlayer().toLowerCase() + '.png'
      img.classList.add('filledBox')
      this.appendChild(img)
    }
  }

  function switchPlayerDisplay () {
    if (game.currentPlayer() === PLAYER_1) {
      document.querySelector('div.pointer.p2').style.display = 'none'
      document.querySelector('div.pointer.p1').style.display = 'block'
    } else {
      document.querySelector('div.pointer.p1').style.display = 'none'
      document.querySelector('div.pointer.p2').style.display = 'block'
    }
  }

  function updateScore (newScore) {
    document.querySelector('.score').textContent = newScore[ 0 ] + ' - ' + newScore[ 1 ]
  }
})
