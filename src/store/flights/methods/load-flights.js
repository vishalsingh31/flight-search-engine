import { loadFlightsStart, loadFlightsSuccess, loadFlightsError } from '../actions';

export function loadFlights() {
    return (dispatch) => {
        dispatch(loadFlightsStart());
        return fetch('http://localhost:4000/flightsData.json')
            .then((response) => {
                return response.json()
            }).then((data) => {
                dispatch(loadFlightsSuccess(data));
            })
            .catch((error) => {
                dispatch(loadFlightsError('Error loading Flights Data'));
            });
    };
}
