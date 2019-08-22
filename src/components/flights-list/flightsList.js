import React, { Component } from 'react';
import { FlightComponent } from '../flight-component';
import { connect } from "react-redux";
import './flightsList.less';

class FlightsListComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flights-list-wrapper">
                <div className="flights-list-header">
                    <div className="flights-list-header-left-container">
                        {this.props.returnDate ? `${this.props.origin} > ${this.props.destination} > ${this.props.origin}`
                            : `${this.props.origin} > ${this.props.destination}`}
                    </div>
                    <div className="flights-list-header-right-container">
                        <span className="flights-list-header-right-container-label">
                            {`Depart: ${this.props.departDate}`}
                        </span>
                        {this.props.returnDate && <span className="flights-list-header-right-container-label">
                            {`Return: ${this.props.returnDate}`}
                        </span>}
                    </div>
                    <div className="clear-float" />
                </div>
                <div className="flights-list-items-wrapper">
                    {this.props.departFlights.map((departRow, keyDepart) => {
                        if ((this.props.returnFlights.length === 0) && (departRow.price <= this.props.priceRange)) {
                            return <FlightComponent key={keyDepart} departFlight={departRow} />
                        } else {
                            return this.props.returnFlights.map((returnRow, keyReturn) => {
                                if ((departRow.price + returnRow.price) <= this.props.priceRange) {
                                    return <FlightComponent key={keyDepart+keyReturn}
                                        departFlight={departRow} returnFlight={returnRow} />
                                }
                            });
                        }
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const departListlength = state.appData.searchFlightsList.departList.length;
    const returnListlength = state.appData.searchFlightsList.returnList.length;
    const departListData = state.appData.searchFlightsList.departList;
    const returnListData = state.appData.searchFlightsList.returnList;
    return {
        origin: departListlength > 0 && departListData[0].origin,
        destination: departListlength > 0 && departListData[0].destination,
        departDate: departListlength > 0 && departListData[0].departDate,
        returnDate: returnListlength > 0 && returnListData[0].departDate,
        departFlights: departListData,
        returnFlights: returnListData,
        priceRange: state.appData.priceRange
    }
}

export const FlightsList = connect(mapStateToProps, null)(FlightsListComponent);
