import { SET_NAME, SET_ROLE, SET_IDX, LOGOUT, UserActionTypes  } from '../actions/Actions';

interface UserState {
  name: string;
  role: string;
  idx: bigint;
}

const initialState: UserState = {
  name: '',
  role: '',
  idx: BigInt(0),
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case SET_IDX:
      return {
        ...state,
        idx: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;