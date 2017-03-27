var assert = require('assert')
var Othello = require('../js/othello')

var PLAYER_1 = 'BLACK'
var PLAYER_2 = 'WHITE'

var othello = new Othello()

/**
 * Test initiate Game
 */
console.log('Testing Initiate Game')
othello.initiateGame()
// console.log(othello.tiles)
assert.strictEqual(othello.tiles.length, 8, 'Game board must have 8 rows.')
assert.strictEqual(othello.tiles[ 0 ].length, 8, 'Game board must have 8 cols.')
assert.strictEqual([].concat.apply([], othello.tiles).filter(ele => ele === null).length, 60, 'Game default state should have blank(null) values in all of its tiles.')
assert.strictEqual(othello.tiles[ 3 ][ 3 ], PLAYER_2, '(3,3) must be a white piece.')
assert.strictEqual(othello.tiles[ 3 ][ 4 ], PLAYER_1, '(3,4) must be a black piece.')
assert.strictEqual(othello.tiles[ 4 ][ 3 ], PLAYER_1, '(4,3) must be a black piece.')
assert.strictEqual(othello.tiles[ 4 ][ 4 ], PLAYER_2, '(4,4) must be a white piece.')
console.log('Passed Initiate Game')
console.log('-------------------------------')

/**
 * Test valid move
 */
console.log('Game Flow Testing starts from here.')
console.log('Testing Valid Move')
assert.deepEqual(othello.getValidDirections([2, 3]), ['S'], 'Only should return South as valid direction.')
assert.deepEqual(othello.checkIdenticalTileExists([2, 3], 'S'), [4, 3], 'There should be a black tile at (4,3).')
assert.deepEqual(othello.getValidDirections([5, 4]), ['N'], 'Only should return North as valid direction')
assert.deepEqual(othello.checkIdenticalTileExists([5, 4], 'N'), [3, 4], 'There should be a black tile at (3,4).')
console.log('Passed Testing Valid Move')
console.log('-------------------------------')
console.log('Testing Reversing Tiles player1')
othello.reverseTiles([2, 3], [4, 3], 'S')
assert.strictEqual(othello.tiles[ 3 ][ 3 ], PLAYER_1, '(3,3) should have been changed to black.')
console.log('Passed Reversing Tiles player1')
console.log('-------------------------------')
console.log('Testing switch player')
othello.switchTurn()
assert.strictEqual(othello.currentPlayer(), PLAYER_2, 'player should be switched to player 2 after switch.')
console.log('Passed switch player')
console.log('-------------------------------')
console.log('Testing Player2 Valid Move')
assert.deepEqual(othello.getValidDirections([4, 2]), ['E', 'NE'], 'Only should return East as valid direction.')
assert.deepEqual(othello.checkIdenticalTileExists([4, 2], 'E'), [4, 4], 'There should be a white tile at (4,4).')
assert.deepEqual(othello.checkIdenticalTileExists([4, 2], 'NE'), false, 'There should be no white tile at north east direction.')
console.log('Passed Testing Player2 Valid Move')
console.log('-------------------------------')
console.log('Testing Reversing Tiles player2')
othello.reverseTiles([4, 2], [4, 4], 'E')
assert.strictEqual(othello.tiles[ 4 ][ 3 ], PLAYER_2, '(4,3) should have been changed to white.')
console.log('Passed Reversing Tiles player2')
console.log('-------------------------------')
console.log(othello.tiles)
othello.switchTurn()
console.log('Testing Turn Count')
assert.strictEqual(othello.turnCount, 2, 'should be player1\'s turn.')
console.log('Passed Testing Turn Count')
console.log('-------------------------------')
console.log('Testing available Moves player1')
assert.deepEqual(othello.availableMoves(), [[5, 1], [5, 2], [5, 3], [5, 4], [5, 5]], 'There should be 5 available moves for player 1.')
var tempArr = [ [5, 1], [5, 2], [5, 3], [5, 4], [5, 5] ]
tempArr.forEach(function (moveIndex) {
  // console.log(moveIndex)
  assert.strictEqual(othello.isValidMove(moveIndex), true, 'Valid move should return true.')
})
assert.strictEqual(othello.isValidMove([6, 3]), false, 'Invalid move should return false.')
console.log('Passed Testing available Moves player1')
console.log('-------------------------------')
// assert.strictEqual(othello.isValidMove([2, 3], PLAYER_1), true, 'Should return True for valid move for (2,3) for player1.')
// assert.strictEqual(othello.isValidMove([5,3],PLAYER_2), true, 'Should return True for valid move for (5,3) for player2.')
// assert.strictEqual(othello.isValidMove([3,5],PLAYER_1), false, 'Should return True for valid move for (3,5) for player1.')
// assert.strictEqual(othello.isValidMove([4,3],PLAYER_2), false, 'Should return True for valid move for (4,5) for player2.')

/**
 * Test invalid move
 */

/**
 * test game over
 * all moves filled or no more available move
 */
