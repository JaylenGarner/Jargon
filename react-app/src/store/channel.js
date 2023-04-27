const defaultState = {}

const LOAD_CHANNEL = 'channels/LOAD_CHANNEL';
const CREATE_CHANNEL = 'channels/CREATE_CHANNEL';
const EDIT_CHANNEL = 'channels/EDIT_CHANNEL';
const CLEAR_CHANNEL = 'channels/CLEAR_CHANNEL'
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL';

// GET
const loadChannel = payload => {
    return {
        type: LOAD_CHANNEL,
        payload
    }
}

export const loadChannelThunk = (channelId) => async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadChannel(data))
      }
}

// POST

const createChannel = payload => {
    return {
        type: CREATE_CHANNEL,
        payload
    }
}

export const createChannelThunk = (serverId, name) => async (dispatch) => {

    const res = await fetch('/api/channels/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serverId,
          name
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(createChannel(newData))
    }
}

// PUT/PATCH

const editChannel = payload => {
    return {
        type: EDIT_CHANNEL,
        payload
    }
}

export const editChannelThunk = (channelId, name) => async (dispatch) => {

    const res = await fetch(`/api/channels/${channelId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(editChannel(newData))
    }
}

// DELETE

const deleteChannel = (channelId) => {
    return {
        type: DELETE_CHANNEL,
        channelId
    }
}

export const deleteChannelThunk = (channelId) => async (dispatch) => {
    const channel = await fetch(`/api/channels/${channelId}/delete`, {
        method: "DELETE"
    })

    if (channel.ok) dispatch(deleteChannel(channelId))
}

const clearChannel = () => {
    return {
        type: CLEAR_CHANNEL
    }
}

export const clearChannelThunk = () => async (dispatch) => {
    dispatch(clearChannel())
}


export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_CHANNEL:
            newState[action.payload.id] = action.payload
            return newState
        case CREATE_CHANNEL:
            newState[action.payload.id] = action.payload
            return newState
        case EDIT_CHANNEL:
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_CHANNEL:
            delete newState[action.channelId]
            return newState
        case CLEAR_CHANNEL:
            return defaultState
        default:
            return state;
    }
}
