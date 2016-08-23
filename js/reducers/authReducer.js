export default function auth (
  state = {
    token: undefined
  }, action
) {
  switch (action.type) {
    case "AUTH_SET_TOKEN":
    console.log(action.payload)
    return {

      ...state,token:action.payload


    }
    case "AUTH_DELETE_TOKEN":
      return Object.assign({}, state, {
        token: undefined
      })
    default:
      return state
  }
}