export const initialState = Object.freeze({
    flights: {
        data: [],
        status: "NotStarted"
    },
    searchFlightsList: {
        departList: [],
        returnList: []
    },
    priceRange: 50000
});