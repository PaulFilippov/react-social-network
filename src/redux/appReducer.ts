import {getAuthUserData} from "./authReducer";


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean,
    //globalError: null
}

let initialState: InitialStateType = {
    initialized: false,
    //globalError: null
};



const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return  {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});



export const initializeApp = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserData());
    //когда промис зарезолвится
    Promise.all([promise])
        .then(() => {
        dispatch(initializedSuccess());
    });
}



export default appReducer;