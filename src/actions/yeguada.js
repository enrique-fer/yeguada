import {  
    SET_HORSES,
    SET_HORSES_CONTENT,
    CHANGE_HORSES_CONTENT
} from "./types";

export function setHorses(horses, onClick) {
    return ({
        type: SET_HORSES,
        payload: {
            horses,
            onClick: onClick ? onClick : ''
        }
    })
}

export function setHorsesContent(content) {
    return ({
        type: SET_HORSES_CONTENT,
        payload: content
    })
}

export function changeActiveContent(id, horse) {
    return ({
        type: CHANGE_HORSES_CONTENT,
        payload: {
            id,
            horse: horse ? horse : ''
        }
    })
}