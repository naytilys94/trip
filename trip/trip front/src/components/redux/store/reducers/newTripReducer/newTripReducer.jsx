export let newTripReducer = (state, action) => {
  if (state === undefined) {
      return {title: '', country: '', region: ''}
  }
  if( action.type === 'ADD_TITLE') {
      return {...state,
              title: action.title
              }
  }
  if(action.type === 'ADD_COUNTRY') {
      return {...state,
              country: action.country
            }
  }
  if(action.type === 'ADD_REGION') {
      return {...state,
              region: action.region
            }
  }
  if(action.type === 'ADD_ABOUTYOU') {
      return {...state,
              aboutyou: action.aboutyou
            }
  }

  return state
}