import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default class marktext extends Component {

    static PropTypes = {
        name: PropTypes.string,
        transports: PropTypes.object,
    }

    constructor(props){
        super(props)
    }

    render(){
        const buses = [];
        const metros = [];
        if(this.props.transports.Buses[0]) {
            buses.push(<text> Buss: {this.props.transports.Buses[0].LineNumber}, Destination: {this.props.transports.Buses[0].Destination}, Tid: {this.props.transports.Buses[0].DisplayTime}</text>)
            buses.push(<br/>);
            buses.push(<text> Buss: {this.props.transports.Buses[1].LineNumber}, Destination: {this.props.transports.Buses[1].Destination}, Tid: {this.props.transports.Buses[1].DisplayTime}</text>)  
        }
        if(this.props.transports.Metros[0]) {
            metros.push(<text> Tunnelbana: {this.props.transports.Metros[0].LineNumber}, Destination: {this.props.transports.Metros[0].Destination}, Tid: {this.props.transports.Metros[0].DisplayTime}</text>)
            metros.push(<br/>);
            metros.push(<text> Tunnelbana: {this.props.transports.Metros[1].LineNumber}, Destination: {this.props.transports.Metros[1].Destination}, Tid: {this.props.transports.Metros[1].DisplayTime}</text>)  
        }

        const transport = [];
        console.log(this.props.transports);
        return(
            <div className={ styles.container }>
                <div>
                {this.props.name}
                </div>
                {buses}
                <br/>
                {metros}
                </div>
        )
    return null;
    }

}