import React from 'react';
import './Controller.css';

class Controller extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        keystate : {}
      };

      document.addEventListener("keydown", (e)=>{
        let key = e.key;
        if(this.state.keystate[key]==true){
          return;
        }
        switch(key){
          case "ArrowUp":
            this.props.move_pos_func(0, -1); break;
          case "ArrowDown":
            this.props.move_pos_func(0, 1); break;
          case "ArrowLeft":
            this.props.move_pos_func(-1, 0); break;
          case "ArrowRight":
            this.props.move_pos_func(1, 0); break;
          case " ":
            this.props.move_pos_func(0, 0); break;
        }
        this.state.keystate[key] = true;
      }, false);

      document.addEventListener("keyup", (e)=>{
        let key = e.key;
        this.state.keystate[key] = false;
      }, false)

    }

    handleClick(dx, dy){
        console.log("click", dx, dy)
        this.props.move_pos_func(dx, dy);
    }
    render(){
      return <div id="Controller">
        <div className="controll-button up-button" onMouseDown={()=>this.handleClick(0, -1)}>↑</div>
        <div className="controll-button left-button" onMouseDown={()=>this.handleClick(-1, 0)}>←</div>
        <div className="controll-button stay-button" onMouseDown={()=>this.handleClick(0, 0)}>○</div>
        <div className="controll-button right-button" onMouseDown={()=>this.handleClick(1, 0)}>→</div>
        <div className="controll-button down-button" onMouseDown={()=>this.handleClick(0, 1)}>↓</div>
      </div>;
    }
  }

  export default Controller;