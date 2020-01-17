import React from 'react';
import './App.css';
import Boundingbox from 'react-bounding-box';

class App extends React.Component {
  state = {
    selected: false
  };

  canvas = null;
  ctx = null;
  rect = {};
  imageObj = null;
  drag = false;

  componentDidMount() {
    this.init();
  }

  init() {
    let self = this;
    this.canvas = document.getElementById('canvas2');
    this.ctx = this.canvas.getContext('2d');
    this.imageObj = new Image();
    this.imageObj.src = 'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg';
    this.imageObj.onload = function () { self.ctx.drawImage(self.imageObj, 0, 0); };
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
    this.canvas.addEventListener('mousedown', this.mouseDown.bind(this), false);
    this.canvas.addEventListener('mouseup', this.mouseUp.bind(this), false);
    this.canvas.addEventListener('mousemove', this.mouseMove.bind(this), false);
  };

  getSelectionStr() {
    if (this.state.selected) {
      return `x1: ${this.rect.startX}, y1: ${this.rect.startY}, x2: ${this.rect.w}, y2: ${this.rect.h}`
    }
  }

  mouseDown(e){
    this.drag = true;
    this.rect.startX = e.pageX;
    this.rect.startY = e.pageY;
  }

  mouseUp(e){
    this.drag = false
    this.setState({
      selected: true
    })
  }

  mouseMove(e){
    if (this.drag) {
      let self = this;
      this.ctx.clearRect(0, 0, 500, 500);
      this.ctx.drawImage(self.imageObj, 0, 0);
      this.rect.w = (e.pageX) - this.rect.startX;
      this.rect.h = (e.pageY) - this.rect.startY;
      this.ctx.strokeStyle = 'red';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.strokeRect(this.rect.startX, this.rect.startY, this.rect.w, this.rect.h);
    }
  }

  selectFile = (e) => {
    var url = URL.createObjectURL(e.target.files[0]);
    this.setState({
      url
    })
    const bref = this.refs.canvas;
    let bcanvas = bref.canvas;
    bcanvas.width = 640;
    bcanvas.height = 425;
    const ctx = bcanvas.getContext("2d");
  };


  render(){
    const params = {
      image: 'https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg',
      boxes: [
        {coord: [this.state.inp1, this.state.inp2, this.state.inp3, this.state.inp4], label: "A"},
        // {coord: [300, 0, 250, 250], label: "B"},
        // {coord: [700, 0, 300, 25], label: "C"},
        // {coord: [1100, 0, 25, 300], label: "D"}
        // onMouseUp={this.mouseup} onMouseMove={this.mousemove}
      ],
      options: {
        colors: {
          normal: 'rgba(255,225,255,1)',
          selected: 'rgba(0,225,204,1)',
          unselected: 'rgba(100,100,100,1)'
        },
        style: {
          maxWidth: '100%',
          maxHeight: '90vh',
        },
        showLabels: false
      }
    };

    return (
      <div className="App">
        <input type="file" id="inp" onChange={this.selectFile} />
        <br /><br />
        Enter coords:{' '}For Example: {' '} 300, 0, 250, 100
        <br />
        <input type="number" id="inp1" onChange={(e) => {this.setState({ [e.target.id]: parseInt(e.target.value) })}} />
        <input type="number" id="inp2" onChange={(e) => {this.setState({ [e.target.id]: parseInt(e.target.value) })}} />
        <input type="number" id="inp3" onChange={(e) => {this.setState({ [e.target.id]: parseInt(e.target.value) })}} />
        <input type="number" id="inp4" onChange={(e) => {this.setState({ [e.target.id]: parseInt(e.target.value) })}} />
        <br /><br />
        <Boundingbox
          ref="canvas"
          image={params.image}
          boxes={params.boxes}
          options={params.options}
        />
        <canvas ref="canvas2" id="canvas2"></canvas>
        <br /><br />
        {this.getSelectionStr()}
      </div>
    );
  }
}

export default App;
