const defaultState = {}

const LOAD_SERVERS = 'servers/LOAD_SERVERS';
const LOAD_ONE_SERVER = 'servers/LOAD_ONE_SERVER'
// const CREATE_SERVER = 'servers/CREATE_SERVER';

const loadServers = payload => {
    return {
        type: LOAD_SERVERS,
        payload
    }
}

// const loadOneServer = (spot) => {
//     return {
//       type: GET_SPOT_BY_ID,
//       spot
//     }
//   }

export const loadServersThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/servers`)

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
        // case LOAD_SERVER:
        //     return {...newState, ...action.payload}
        // case CREATE_SERVER:
        //     newState[action.payload] = action.payload
        //     return newState;
        default:
            return state;
    }
}









// const loadServer = payload => {
//     return {
//         type: LOAD_SERVER,
//         payload
//     }
// }

// const createServer = payload => {
//     return {
//         type: CREATE_SERVER,
//         payload
//     }
// }

// export const createServerThunk = (data) => async (dispatch) => {
//     const newServer = JSON.stringify(data);

//     const res = await fetch('/api/servers/create', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: newServer
//     })

//     if (res.ok) {
//         const newData = await res.json()
//         dispatch(createServer(newData))
//     }
// }


// export const loadServerThunk = (id) => async (dispatch) => {
//     const res = await fetch(`api/servers/${id}`)

//     if (res.ok) {
//         const data = await res.json()
//         dispatch(loadServer(data))
//       }
// }
