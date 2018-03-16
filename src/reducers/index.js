import { combineReducers } from 'redux';
import UserReducer from './user_reducer';
import CountryReducer from './country_reducer';
import AuthReducer from './auth_reducer';

import CategoryReducer from './cat_reducer';
import ActiveCat from './active_cat_reducer';
import ActiveGame from './active_game_reducer';

//state mapping
//wire up reducer to use in view(react)
const rootReducer = combineReducers({
    users: UserReducer,
    country: CountryReducer,
    categories: CategoryReducer,
    activeCat: ActiveCat,
    activeGame: ActiveGame,
    auth: AuthReducer
});

export default rootReducer;
