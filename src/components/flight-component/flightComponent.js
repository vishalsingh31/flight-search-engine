import React, { Component } from 'react';
import './flightComponent.less';

class FlightComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="flight-info-wrapper">
                <div className="flight-info-price">
                    {this.props.returnFlight ? `Rs. ${this.props.departFlight.price + this.props.returnFlight.price}`
                        : `Rs. ${this.props.departFlight.price}`}
                </div>
                <div className={this.props.returnFlight ? "flight-info-depart-block" : "flight-info-depart-block-switch"}>
                    <span className="flight-number-label">{this.props.departFlight.flightNumber}</span>
                    <span>{`${this.props.departFlight.origin} > ${this.props.departFlight.destination}`}</span>
                    <span>{`Depart: ${this.props.departFlight.departTime}`}</span>
                    <span>{`Return: ${this.props.departFlight.arrivalTime}`}</span>
                </div>
                {this.props.returnFlight && <div className="flight-info-return-block">
                    <span className="flight-number-label">{this.props.returnFlight.flightNumber}</span>
                    <span>{`${this.props.returnFlight.origin} > ${this.props.returnFlight.destination}`}</span>
                    <span>{`Depart: ${this.props.returnFlight.departTime}`}</span>
                    <span>{`Return: ${this.props.returnFlight.arrivalTime}`}</span>
                </div>}
                <div className="flight-info-submit-block">
                    <button className="flight-book-button" onClick={() => {alert('Sorry, Currently the application does not support this functionality')}}>Book this flight</button>
                </div>
                <div className="clear-float" />
            </div>
        )
    }
} 

export { FlightComponent };
