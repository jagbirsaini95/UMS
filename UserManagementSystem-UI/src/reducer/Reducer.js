export const initialstate = null;

export function reducer(state, action) {
    if (action.type === "ADMIN")
        return action.payload
    else if (action.type === "USER")
        return action.payload
    return state
}