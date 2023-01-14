const defaultState = {}

const CREATE_MESSAGE = 'message/CREATE_MESSAGE';
// const DELETE_MESSAGE = 'message/DELETE_MESSAGE';

// POST

const createMessage = payload => {
    return {
        type: CREATE_MESSAGE,
        payload
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

// DELETE

// const deleteMessage = (messageId) => {
//     return {
//         type: DELETE_SERVER,
//         messageId
//     }
// }

// export const deleteMessageThunk = (messageId) => async (dispatch) => {

// }

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case CREATE_MESSAGE:
            newState[action.payload] = action.payload
            return newState;
        default:
            return state;
    }
}
