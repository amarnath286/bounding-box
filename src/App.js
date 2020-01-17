import React from 'react';
import './App.css';
import Boundingbox from 'react-bounding-box';

class App extends React.Component {
  state = {
    url : null,
    rects:[[110, 30, 70, 70], [40, 30, 70, 70]],
  };

  componentDidMount() {
    this.drawRects();
  }

  drawRects() {
      var self = this;
      var myImage = new Image();
      myImage.src = "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg";
      const ctx = this.refs.canvas2.getContext('2d');
      myImage.onload = function() {
      // var width = 300;
      // var height = 400;
      ctx.drawImage(myImage, 0, 0, 300, 200);

      ctx.beginPath();
      ctx.strokeStyle="white";
      for(var i=0;i<self.state.rects.length;i++) {
        ctx.rect(self.state.rects[i][0],
                 self.state.rects[i][1],
                 self.state.rects[i][2],
                 self.state.rects[i][3]);
      }
      ctx.stroke();
    }
  }

  showCoords(event) { 
      var x = event.clientX;
      var y = event.clientY;
      var coords = "X coords: " + x + ", Y coords: " + y;
      document.getElementById("demo").innerHTML = coords;
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
        <canvas ref="canvas2" id="canvas2" onClick={this.showCoords} />
        
        <p id="demo"></p>
      </div>
    );
  }
}

export default App;
