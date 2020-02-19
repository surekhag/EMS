import axios from 'axios'
import { FETCH_PEER_REVIEW } from '../configurations/endPoints'


export function loadAllPeerReviews() {
    return axios.get(FETCH_PEER_REVIEW)
}