import {
    SET_DATES,
    ADD_ACTIVITY_DATE
} from './types';

export function fetchDates() {
    return ({
        type: SET_DATES,
        payload: [
            {
                _id: 0,
                actividad: "Ruta",
                fecha: new Date(2021, 11, 12)
            },
            {
                _id: 0,
                actividad: "Clase",
                fecha: new Date(2021, 11, 20)
            }
        ]
    })
}

export function addDate(activity, date) {
    return ({
        type: ADD_ACTIVITY_DATE,
        payload: {
            activity,
            date
        }
    })
}