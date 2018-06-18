import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PopupContent extends Component {
  static PropTypes = {
    data: PropTypes.object,
  }
  
  constructor(props){
    super(props)
  }

  render(){
    console.log(this.props.data);
    return(
      <div>
        <p> STATION INFORMATION </p>
        <p> {this.props.data.LatestUpdate}</p>
      </div>
    )
  }
}
