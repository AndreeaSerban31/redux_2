import { FETCH_CAT } from '../actions/type';

export default function( state = [] , action ){
    switch(action.type){
        case FETCH_CAT:  return action.payload
    }
    return state
}


