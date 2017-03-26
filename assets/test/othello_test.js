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
console.log(othello.tiles)
assert.strictEqual(othello.tiles.length, 8, 'Game board must have 8 rows.')
assert.strictEqual(othello.tiles[ 0 ].length, 8, 'Game board must have 8 cols.')
assert.strictEqual([].concat.apply([], othello.tiles).filter( ele => ele === null).length, 60, 'Game default state should have blank(null) values in all of its tiles.')
assert.strictEqual(othello.tiles[ 3 ][ 3 ], PLAYER_2, '(3,3) must be a white piece.')
assert.strictEqual(othello.tiles[ 3 ][ 4 ], PLAYER_1, '(3,4) must be a black piece.')
assert.strictEqual(othello.tiles[ 4 ][ 3 ], PLAYER_1, '(4,3) must be a black piece.')
assert.strictEqual(othello.tiles[ 4 ][ 4 ], PLAYER_2, '(4,4) must be a white piece.')
console.log('Passed Initiate Game')

/**
 * Test valid move
 */
console.log('Testing Valid Move')
// assert.strictEqual(othello.isValidMove([3,4],PLAYER_1), true, ''

/**
 * Test invalid move
 */


/**
 * test game over
 * all moves filled or no more available move
 */
