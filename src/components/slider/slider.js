import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePriceRange } from "../../store/flights/actions";
import './slider.less';

class SliderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.priceRange
        }
    }

    handleChange = (event) => {
        event.preventDefault();        
        this.props.updatePriceRange(event.target.value);
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <div className="slider">
                <div className="slider-range-wrapper">
                    <div className="slider-range-heading-text">
                        Refine flight search
                    </div>
                    <div className="slider-range-element-wrappper">
                        <span>0</span><span className="slider-range-element-high-range">{this.state.value}</span>
                        <input className="slider-range-element" type="range" min="0" max="50000"
                            id="sliderRange" step="500" value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <div className="slider-range-price-range-text">
                        Prices upto: <span className="slider-range-price-range-text-value">{this.state.value}</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        priceRange: state.appData.priceRange
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePriceRange: (data) => {
            dispatch(updatePriceRange(data))
        }
    }
}

export const Slider = connect(mapStateToProps, mapDispatchToProps)(SliderComponent);
