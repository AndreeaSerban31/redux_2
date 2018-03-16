import { FETCH_COUNTRY } from '../actions/type';
// reducer o functie care manipuleaza starea actiunii
export default function(state= [], action){
    switch(action.type){
        case FETCH_COUNTRY:console.log(action.payload); return action.payload.data;
    }
    return state
}
