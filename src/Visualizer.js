import React from 'react';
import './Visualizer.css';

class Cell extends React.Component{
  x = 10;
  y = 10;
  w = 10;
  h = 10;
  render(){
    return <rect x={this.x} y={this.y} width={this.w} height={this.h} fill="#ffffff" stroke="#ff0000"></rect>
  }
}

class Visualizer extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    const cell_size = 20;

    let cell_list = [];
    for(let y_pos=0; y_pos<this.props.y_size; y_pos++){
      for(let x_pos=0; x_pos<this.props.x_size; x_pos++){
      cell_list.push(
        <rect
          fill={this.props.board[y_pos*this.props.x_size+x_pos] ? ((x_pos==this.props.x_pos && y_pos==this.props.y_pos) ? "#ffff00" : "#ffffff") : "#000000"}
          stroke={ "#600000"}
          x={x_pos*cell_size}
          y={y_pos*cell_size}
          width={cell_size}
          height={cell_size} >
        </rect>
      )
      }

    }

    return <div id="Visualizer">
      <svg width={this.props.x_size*cell_size} height={this.props.y_size*cell_size}>
      {cell_list}
      </svg>
    </div>;
  }
}

  export default Visualizer;