import { persistor } from "../redux/store";
import { Dispatch } from 'redux';

interface LogoutAction {
    type: 'LOGOUT';
}

export const logout = () => (dispatch: Dispatch<LogoutAction>): void => {
    dispatch({ type: 'LOGOUT' });  // Dispatch the LOGOUT action to reset the Redux state
    persistor.purge();  // Clear the persisted state from localStorage or sessionStorage
};