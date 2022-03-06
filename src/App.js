import logo from './logo.svg';
import './App.css';
import React from 'react';
import Visualizer from './Visualizer';
import Controller from './Controller';
import Gameover from './Gameover';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);

    const x_size = 16;
    const y_size = 16;
    const initial_life_num = 16;

    let [board, x_pos, y_pos] = this.generate_board(x_size, y_size, initial_life_num);

    this.state = {
      generation: 0,
      x_size: x_size,
      y_size: y_size,
      x_pos: x_pos,
      y_pos: y_pos,
      board: board
    };


  }

  generate_board(x_size, y_size, initial_life_num) {
    let board = [];
    for (let i = 0; i < x_size * y_size; i++) {
      board.push(0);
    }

    // shuffle array
    var array = [...Array(x_size * y_size)].map((_, i) => i);
    for (let i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }

    // set initial life
    for (let i = 0; i < initial_life_num - 1; i++) {
      board[array[i]] = 1;
    }

    // calc initial position
    let init_pos_idx = array[initial_life_num - 1];
    board[init_pos_idx] = 1;

    let x_pos = init_pos_idx % x_size;
    let y_pos = Math.floor(init_pos_idx / x_size);

    console.log(x_pos, y_pos);


    return [board, x_pos, y_pos];
  }

  move_pos(dx, dy) {
    console.log("move", dx, dy)

    let old_x_pos = this.state.x_pos;
    let old_y_pos = this.state.y_pos;
    let new_x_pos = this.state.x_pos + dx;
    let new_y_pos = this.state.y_pos + dy;

    if (new_x_pos < 0 || this.state.x_size <= new_x_pos || new_y_pos < 0 || this.state.y_size <= new_y_pos
      ||
      this.state.board[new_x_pos + new_y_pos * this.state.x_size] == 1 && (dx!=0 || dy!=0)) {
      console.log("cannot move");
      return;
    }

    this.state.board[old_x_pos + old_y_pos * this.state.x_size] = 0;
    this.state.board[new_x_pos + new_y_pos * this.state.x_size] = 1;
    this.setState({
      x_pos: new_x_pos,
      y_pos: new_y_pos,
    });

    this.update_board(new_x_pos, new_y_pos)
  }

  update_board(new_x_pos, new_y_pos) {
    let new_board = Array(this.state.x_size * this.state.y_size);
    for (let x = 0; x < this.state.x_size; x++) {
      for (let y = 0; y < this.state.y_size; y++) {
        let count = 0;
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx == 0 && dy == 0) {
              continue;
            }
            if (0 <= x + dx && x + dx < this.state.x_size && 0 <= y + dy && y + dy < this.state.y_size) {
              count += this.state.board[(x + dx) + (y + dy) * this.state.x_size];
            }
          }
        }
        let cell_idx = x + y * this.state.x_size;
        if(x==new_x_pos && y==new_y_pos){
          new_board[cell_idx] = 1;
          console.log("play")
        }else{
          if (count == 2 || count == 3) {
            new_board[cell_idx] = 1;
          }else{
            new_board[cell_idx] = 0;
          }
        }

        // console.log(x, y, count);
      }
    }

    this.setState({
      generation: this.state.generation + 1,
      board: new_board
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            ゲームライフゲーム<br />
            Game Life Game
          </p>
        </header>

        Generation: {this.state.generation}

        <Visualizer x_size={this.state.x_size} y_size={this.state.y_size} x_pos={this.state.x_pos} y_pos={this.state.y_pos} board={this.state.board} />
        <Controller move_pos_func={(dx, dy) => { this.move_pos(dx, dy) }} x_pos={this.state.x_pos} y_pos={this.state.y_pos} />

      </div>
    );
  }

}

export default App;
