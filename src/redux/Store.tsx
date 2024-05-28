import { createStore, combineReducers } from 'redux';
import userReducer from '../redux/reducers/Reducers';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

// AppDispatch 타입을 정의합니다.
export type AppDispatch = typeof store.dispatch;

export default store;