import React, { Component } from 'react';
import { updateFlightsSearchData } from "../../store/flights/actions";
import { connect } from 'react-redux';
import './tabs.less';

class TabsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            returnDateRequired: false,
            origin: '',
            destination: '',
            departureDate: '',
            returnDate: '',
            passengers: 1

        }
    }

    handleClick = (name) => {
        if (name === "OneWay") {
            this.setState({
                returnDateRequired: false,
                returnDate: ''
            });
        } else {
            this.setState({
                returnDateRequired: true
            });
        }
    }

    getFormattedDate = (date) => {
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        return date.getFullYear() + "-" + month + "-" + date.getDate();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let filteredList = {};
        filteredList.departFlightsList = this.props.flightsData.filter((item) => {
            return (item.origin.toUpperCase() === this.state.origin.toUpperCase() &&
                item.destination.toUpperCase() === this.state.destination.toUpperCase() &&
                item.departDate === this.state.departureDate)
        });
        if (this.state.returnDate !== '') {
            filteredList.returnFlightsList = this.props.flightsData.filter((item) => {
                return (item.origin.toUpperCase() === this.state.destination.toUpperCase() &&
                    item.destination.toUpperCase() === this.state.origin.toUpperCase()
                    && item.departDate === this.state.returnDate)
            });
        } else {
            filteredList.returnFlightsList = [];
        }
        this.props.searchClicked();
        this.props.updateFlightsData(filteredList);
    }

    handleDataChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className="tabs">
                <div className="tabs-label-wrapper">
                    <span className={this.state.returnDateRequired ? `tab-label` : `tab-label-selected`} onClick={() => this.handleClick('OneWay')}>One way</span>
                    <span className={this.state.returnDateRequired ? `tab-label-selected` : `tab-label`} onClick={() => this.handleClick('Return')}>Return</span>
                </div>
                <div className="tab-content">
                    <form onSubmit={this.handleSubmit}>
                        <div className="tab-form-container">
                            <label className="tab-input-label">Origin</label>
                            <input className="tab-input" list="originCities" name="origin"
                                onChange={this.handleDataChange} placeholder="Enter Origin City" required />
                            <datalist id="originCities">
                                {this.props.cities.map((item, i) => {
                                    return <option key={i} value={item} />
                                })}
                            </datalist>
                        </div>
                        <div className="tab-form-container">
                            <label className="tab-input-label">Destination</label>
                            <input className="tab-input" list="destinationCities" name="destination"
                                onChange={this.handleDataChange} placeholder="Enter Destination City" required />
                            <datalist id="destinationCities">
                                {this.props.cities.map((item, i) => {
                                    return <option key={i} value={item} />
                                })}
                            </datalist>
                        </div>
                        <div className="tab-form-container">
                            <label className="tab-input-label">Departure Date</label>
                            <input name="departureDate" className="tab-input" type="date"
                                placeholder="Departure Date" id="departure" onChange={this.handleDataChange}
                                min={this.getFormattedDate(new Date())} required></input>
                        </div>
                        <div className="tab-form-container">
                            <label className="tab-input-label">Return Date</label>
                            <input name="returnDate" className="tab-input" type="date"
                                id="return" onChange={this.handleDataChange} disabled={!this.state.returnDateRequired}
                                min={this.state.departureDate} required={this.state.returnDateRequired}
                                value={this.state.returnDate}></input>
                        </div>
                        <div className="tab-form-container">
                            <label className="tab-input-label">Passengers</label>
                            <input name="passengers" className="tab-input" type="number" placeholder="Passengers"
                                min="1" onChange={this.handleDataChange} required />
                        </div>
                        <input name="submit" className="tab-input-submit" type="submit" value="Search" required />
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let cities = [];
    state.appData.flights.data.map((item) => {
        cities.push(item.origin);
        cities.push(item.destination);
    })
    cities = [...new Set(cities)];
    return {
        flightsData: state.appData.flights.data,
        cities: cities
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFlightsData: (data) => {
            dispatch(updateFlightsSearchData(data))
        }
    }
}

export const Tabs = connect(mapStateToProps, mapDispatchToProps)(TabsComponent);
