const defaultState = {}

const LOAD_SERVERS = 'servers/LOAD_SERVERS';

const loadServers = payload => {
    return {
        type: LOAD_SERVERS,
        payload
    }
}

export const loadServersThunk = (userId) => async (dispatch) => {
    const res = await fetch(`api/users/${userId}/servers`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadServers(data))
      }
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_SERVERS:
            return {...newState, ...action.payload}
        default:
            return state;
    }
}
