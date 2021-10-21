import {  
    SET_FEATURES_CARDS
} from "./types";

export function setFeaturesCards(links) {
    return ({
        type: SET_FEATURES_CARDS,
        payload: {
            links
        }
    })
}