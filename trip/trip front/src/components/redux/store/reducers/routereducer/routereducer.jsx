export let routeReducer = (state, action) => {
  if (state === undefined) {
      return {region: '', country: '', triptitle: '', trektitle:''}
  }
  if( action.type === 'ADD_REGION') {
      return {...state,
              region: action.region
              }
  }
  if(action.type === 'ADD_COUNTRY') {
      return {...state,
              country: action.country
            }
  }
  if(action.type === 'ADD_TRIPTITLE') {
      return {...state,
              triptitle: action.triptitle
            }
  }
  if(action.type === 'ADD_TREKTITLE') {
      return {...state,
              trektitle: action.trektitle
            }
  }
  return state
}