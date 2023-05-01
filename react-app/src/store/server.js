const defaultState = {}

const LOAD_SERVERS = 'servers/LOAD_SERVERS';
const CREATE_SERVER = 'servers/CREATE_SERVER';
const CREATE_DIRECT_MESSAGE = 'servers/CREATE_DIRECT_MESSAGE'
const EDIT_SERVER = 'servers/EDIT_SERVER';
const DELETE_SERVER = 'servers/DELETE_SERVER';
const CLEAR_SERVERS = 'servers/CLEAR_SERVERS';
const ADD_USER = 'servers/ADD_USER'

// GET

const loadServers = payload => {
    return {
        type: LOAD_SERVERS,
        payload
    }
}

export const loadServersThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/servers`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadServers(data))
      }
}

// POST

const createServer = payload => {
    return {
        type: CREATE_SERVER,
        payload
    }
}

export const createServerThunk = (name, image) => async (dispatch) => {

    const res = await fetch('/api/servers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(createServer(newData))
        return res
    } else {
        return res
    }
}

const createDirectMessage = payload => {
    return {
        type: CREATE_SERVER,
        payload
    }
}

export const createDirectMessageThunk = (username) => async (dispatch) => {

    const res = await fetch('/api/servers/create-dm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(createDirectMessage(newData))
        return res
    } else {
        return res
    }
}

// PUT/PATCH

const editServer = payload => {
    return {
        type: EDIT_SERVER,
        payload
    }
}

export const editServerThunk = (serverId, name, image) => async (dispatch) => {


    const res = await fetch(`/api/servers/${serverId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image,
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(editServer(newData))
    }
}

const addUser = (payload) => {
    return {
        type: ADD_USER,
        payload
    }
}

export const addUserThunk = (serverId, username) => async (dispatch) => {

    const res = await fetch(`/api/servers/${serverId}/invite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(addUser(newData))
    }
}

// DELETE

const deleteServer = (serverId) => {
    return {
        type: DELETE_SERVER,
        serverId
    }
}

export const deleteServerThunk = (serverId) => async (dispatch) => {
    const server = await fetch(`/api/servers/${serverId}/delete`, {
        method: "DELETE"
    })

    if (server.ok) dispatch(deleteServer(serverId))
}

const clearServers = () => {
    return {
        type: CLEAR_SERVERS
    }
}

export const clearServersThunk = () => async (dispatch) => {
    dispatch(clearServers())
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_SERVERS:
            return {...newState, ...action.payload}
        case CREATE_SERVER:
            newState[action.payload.id] = action.payload
            return newState;
        case CREATE_DIRECT_MESSAGE:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_SERVER:
            newState[action.payload.id] = action.payload
            return newState;
        case ADD_USER:
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_SERVER:
            delete newState[action.serverId]
            return newState
        case CLEAR_SERVERS:
            return defaultState;
        default:
            return state;
    }
}
