[How to write readme - Markdown CheatSheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  
[How to write a good readme for github repo!](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

# Othello

## Rules

1. Game Board 8 x 8, 64 black or white pieces
2. starting position white, black, black, white (diagonal) at the center of the board.
3.


## Gameflow

1. Player1 (Black) starts first
2. Black must place a piece with the black side up on the board, in such a position that there exists at least one straight (horizontal, vertical, or diagonal) occupied line between the new piece and another dark piece, with one or more contiguous white pieces between them.
In other words, a valid move is one where at least one piece is reversed.

< pic >

3. Now white plays. This player operates under the same rules, with the roles reversed: white lays down a white piece, causing a black piece to flip. Possibilities at this time appear thus (indicated by transparent pieces)

< pic >

4. If one player can not make a valid move, play passes back to the other player. When neither player can move, the game ends.

< pic >

5. The player with the most pieces on the board at the end of the game wins.

## Project Stages

1. Requirements
2. Game lib



## Reference
1. https://en.wikipedia.org/wiki/Reversi
