import { AUTH } from '../actions/type';

export default function( state = null , action ){
    switch(action.type){
        case AUTH:  return action.payload
    }
    return state
}
