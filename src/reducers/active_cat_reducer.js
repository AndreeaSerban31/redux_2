import { ACTIVE_CAT } from '../actions/type';

export default function( state = null , action ){
    switch(action.type){
        case ACTIVE_CAT:  return action.payload
    }
    return state
}
