# Conway's Game of Life
## Deployed Site: 
coming soon
## Description
This is a recreation of John Conway's "Game of Life", a cellular automaton program created by British mathematician John Conway in 1970.  <br>
The game's evolution is determined by its initial state. Each cell begins as alive or dead, and changes on each generation according to the rules of the game. 
## Rules
With every generation of the game, each cell will count its neighboring cells to determine if it survives or terminates.
1. Any live cell with two or three live neighbors survives.
2. Any dead cell with three live neighbors becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells remain dead.
## Keep in Mind
The rules of Conway's Game of Life compare the behavior of the automaton to real life in the following ways. If a live cell is <strong>overpopulated</strong> with more than three live neighbors, it will die. If a live cell experiences <strong>underpopulation</strong> by having fewer than two live neighbors, it will die. If a dead cell has exactly three live neighbors, it will become a live cell, as if by <strong>reproduction</strong>. A "healthy" cell will live on to the <strong>next generation</strong> if it has two or three live neighbors.
