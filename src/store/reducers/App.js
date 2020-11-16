import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    SET_APARTMENT_LISTING_DATA

  } from "../../constants/ActionTypes";

  let initState = {
   isFetchingData: false,
    apartmentListingData:[]
  };
  
  const app = (state = initState, action) => {
    switch (action.type) {
      case FETCH_START:
        return {
          ...state,
          isFetchingData: true,
          isFetchedError: false,
          fetchError: ""
        };
      case FETCH_END:
        return {
          ...state,
          isFetchingData: false,
          isFetchedError: false,
          fetchError: ""
        };
      case FETCH_ERROR:
        return {
          ...state,
          isFetchingData: false,
          isFetchedError: true,
          fetchError: action.payload
        };
      case SET_APARTMENT_LISTING_DATA: {
        debugger
        return {
          ...state,
          apartmentListingData:action.payload
        };
      }
      default:
        return state;
    }
  };
  
  export default app;
  