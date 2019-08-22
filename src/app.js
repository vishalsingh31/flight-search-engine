import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFlights } from './store/flights/methods';
import { Header } from './components/header';
import { Tabs } from './components/tabs';
import { FlightsList } from './components/flights-list';
import { Slider } from './components/slider';
import { NoDataComponent } from './components/no-data';
import './app.less';

class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            searchClicked: false
        }
    }

    componentDidMount() {
        this.props.loadFlights();
    }

    searchClicked = () => {
        this.setState({
            searchClicked: true
        })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="flights-search-view">
                    <Tabs searchClicked={this.searchClicked} />
                    <Slider />
                </div>
                <div className="flights-search-details">
                    {this.props.hasSearchData && this.state.searchClicked && <FlightsList />}
                    {!this.props.hasSearchData && this.state.searchClicked && <NoDataComponent />}
                </div>
                <div className="clear-float" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const searchListLength = state.appData.searchFlightsList.departList.length + state.appData.searchFlightsList.returnList.length;
    return {
        hasSearchData: searchListLength > 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadFlights: () => {
            dispatch(loadFlights())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);