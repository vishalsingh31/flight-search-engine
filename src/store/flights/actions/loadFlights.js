export const loadFlightsStart = () => ({
    status: 'Initiated',
    type: 'LOAD_FLIGHTS_START'
});

export const loadFlightsSuccess = (data) => ({
    status: 'Success',
    type: 'LOAD_FLIGHTS_SUCCESS',
    data
});

export const loadFlightsError = (error) => ({
    status: 'Failure',
    type: 'LOAD_FLIGHTS_FAILURE',
    error
});
