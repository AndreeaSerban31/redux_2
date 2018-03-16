import { FETCH_USERS } from '../actions/type';
// reducer o functie care manipuleaza starea actiunii
export default function(state= [], action){
    switch(action.type){
        case FETCH_USERS:  console.log(action.payload.data); return action.payload.data;
    }
    return state
}
