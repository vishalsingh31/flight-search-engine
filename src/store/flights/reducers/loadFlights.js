import { initialState } from '../state/initial-state';

export const FlightsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_FLIGHTS_START':
            return {
                ...state,
                flights: {
                    ...initialState.flights,
                    status: action.status
                }
            }
        case 'LOAD_FLIGHTS_SUCCESS':
            return {
                ...state,
                flights: {
                    status: action.status,
                    data: action.data
                }

            }
        case 'LOAD_FLIGHTS_FAILURE':
            return {
                ...state,
                flights: {
                    status: action.status,
                    data: action.data
                }
            }
        case 'UPDATE_FLIGHTS_SEARCH_DATA':
            return {
                ...state,
                searchFlightsList: {
                    departList: action.data.departFlightsList,
                    returnList: action.data.returnFlightsList
                }
            }
        case 'UPDATE_PRICE_RANGE':
            return {
                ...state,
                priceRange: action.data
            }
        default:
            return state
    }
}
