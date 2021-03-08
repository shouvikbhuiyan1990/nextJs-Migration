import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import joinModal from './joiningModal';
import cources from './cources';
import registration from './registration';
import global from './global';
import booking from './booking';

export default combineReducers({
    routing: routerReducer,
    joinModal,
    cources,
    registration,
    global,
    booking
});