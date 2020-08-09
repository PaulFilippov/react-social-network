import {getAuthUserData} from "./authReducer"
import {InferActionTypes} from "./reduxStore";


const INITIALIZED_SUCCESS = 'SN/APP/INITIALIZED_SUCCESS'


let initialState = {
    initialized: false,
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>


const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return  {
                ...state,
                initialized: true
            };
        default:
            return state
    }
}

export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS})
}

export const initializeApp = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserData())
    //когда промис зарезолвится
    Promise.all([promise])
        .then(() => {
        dispatch(initializedSuccess())
    })
}



export default appReducer;