import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    SET_APARTMENT_LISTING_DATA

  } from "../../constants/ActionTypes";


export const startFetching = () => ({
  type: FETCH_START
});

export const fetchSuccessful = () => ({
  type: FETCH_END
});

export const fetchError = payload => ({
  type: FETCH_ERROR,
  payload: payload
});

  export const getData=(isactive)=>dispatch=>{
    debugger
    dispatch(startFetching());
    fetch('apartmentData.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        debugger
        console.log(response)
        dispatch(fetchSuccessful());
        return response.json();
      })
      .then(function(myJson) {
        debugger
        let preparedPayload;
        switch (isactive) {
          case 2:
            preparedPayload = myJson.list
            break;
          case 1:
            preparedPayload = myJson.list.filter(item=>item.isActive)
            break;
          case 0:
            preparedPayload = myJson.list.filter(item=>!item.isActive)
            break;
          default:
            break;
        }
        dispatch({ type: SET_APARTMENT_LISTING_DATA, payload: preparedPayload });
        console.log(myJson);
      });
  }



 


