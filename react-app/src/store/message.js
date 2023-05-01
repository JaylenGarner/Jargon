const defaultState = {}

const LOAD_MESSAGES = 'message/LOAD_MESSAGES'
const CREATE_MESSAGE = 'message/CREATE_MESSAGE';
// const DELETE_MESSAGE = 'message/DELETE_MESSAGE';



const loadMessages = payload => {
    return {
        type: LOAD_MESSAGES,
        payload
    }
}

const createMessage = payload => {
    return {
        type: CREATE_MESSAGE,
        payload
    }
}

export const loadMessagesThunk = (channelId) => async (dispatch) => {

    const res = await fetch(`/api/channels/${channelId}/messages`)

    if (res.ok) {
        const newData = await res.json()
        dispatch(loadMessages(newData))
    }
}


export const createMessageThunk = (channelId, body) => async (dispatch) => {

    const res = await fetch('/api/messages/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channelId,
            body
        })
    })

    if (res.ok) {
        const newData = await res.json()
        dispatch(createMessage(newData))
    }
}


export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_MESSAGES:
            return {...newState, ...action.payload}
        case CREATE_MESSAGE:
            newState[action.payload.id] = action.payload
            return newState;
        default:
            return state;
    }
}
