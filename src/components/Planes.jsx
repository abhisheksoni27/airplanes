import React, { Component } from 'react';
import './Planes.css';
class Planes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="Planes-root">
                <h4 className="Planes-noOfPlanes">{this.props.noOfPlanes}</h4>

                <span className="Planes-title">Planes</span>
            </div>
         );
    }
}
 
export default Planes;