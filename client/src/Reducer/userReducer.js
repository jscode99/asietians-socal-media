
//initializing initialstate to null
export const initialState = null;

//reducer component with state & action
export const reducer = (state, action) => {
    if (action.type==="USER") {
        return action.payload
    }
    if (action.type==="CLEAR") {
        return null
    }
    return state
}