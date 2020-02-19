import { LOAD_ALL_PEER_SAGA, SET_ALL_PEER } from './actionTypes';

export function LoadAllPeerReviews (){
   return {
       type:LOAD_ALL_PEER_SAGA,
       payload:{}
   }
}
export function SetAllPeerReviews (data){
    return {
        type:SET_ALL_PEER,
        payload:{data}
    }
 }