import React, { Component } from "react";
import "./Planes.css";
class Planes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Planes-root">
        <div className="Planes-container">
          <h4 className="Planes-noOfPlanes">{this.props.noOfPlanes}</h4>
          <span className="Planes-title">Planes within 10 km</span>
        </div>
      </div>
    );
  }
}

export default Planes;
