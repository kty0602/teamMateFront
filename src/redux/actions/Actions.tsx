export const SET_NAME = 'SET_NAME';
export const SET_ROLE = 'SET_ROLE';
export const SET_IDX = 'SET_IDX';
export const LOGOUT = 'LOGOUT';

interface SetNameAction {
  type: typeof SET_NAME;
  payload: string;
}

interface SetRoleAction {
  type: typeof SET_ROLE;
  payload: string;
}

interface SetIdxAction {
  type: typeof SET_IDX;
  payload: bigint;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = SetNameAction | SetRoleAction | SetIdxAction | LogoutAction;

export const setName = (name: string): SetNameAction => ({
  type: SET_NAME,
  payload: name,
});

export const setRole = (role: string): SetRoleAction => ({
  type: SET_ROLE,
  payload: role,
});

export const setIdx = (idx: bigint): SetIdxAction => ({
  type: SET_IDX,
  payload: idx,
});

export const logout = () => ({
  type: LOGOUT,
});