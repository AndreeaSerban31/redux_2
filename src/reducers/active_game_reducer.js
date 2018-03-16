import { ACTIVE_GAME } from '../actions/type';

export default function( state = null , action ){
    switch(action.type){
        case ACTIVE_GAME:  return action.payload
    }
    return state
}