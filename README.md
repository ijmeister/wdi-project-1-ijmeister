# Othello

#### View [Demo](https://ijmeister.github.io/wdi-project-1-ijmeister/)

## Game Setup

1. Game Board 8 x 8, 64 black or white pieces
2. starting position white, black, black, white (diagonal) at the center of the board.

## Game Play

1. Player1 (Black) starts first
2. A valid move needs to fulfill 2 conditions below.
  - There needs to be at least one adjacent opposite tile.  
  - in that same direction, there needs to be an identical tile without any gap in between.
3. If one player can not make a valid move, play passes back to the other player. When neither player can move, the game ends.
4. The player with the most pieces on the board at the end of the game wins.

![screenshot](assets/images/readMe/valid_dir.png "Valid directions")

![screenshot](assets/images/readMe/valid_move.png "Valid Move")

## Game Flow Diagram

![screenshot](assets/images/readMe/flowchart2.png "flowchart")

## Code Design

### Follows OOP

![screenshot](assets/images/readMe/OOP.png "OOP")

### Main logic

- Traversing the grid as (x,y) coordinate from one tile to another, when checking for the 2 required conditions for the player move

![screenshot](assets/images/readMe/coordinate.png "Coordinate")

![screenshot](assets/images/readMe/coordinate_code.png "Coordinate")

### TDD

- Main logic was first built and tested simultaneously with npm test cases

![screenshot](assets/images/readMe/tdd.png "tdd")

![screenshot](assets/images/readMe/test.png "test output")

## Project Stages

1. Requirements / Design
2. Game Logic
3. UI
4. AI (stretch goal) - Future improvement

## Reference
1. https://en.wikipedia.org/wiki/Reversi
2. http://www.othelloonline.org/
3. background image from [here](http://jsfiddle.net/ThinkingStiff/jUr9E/)
4. icons and images from https://thenounproject.com
