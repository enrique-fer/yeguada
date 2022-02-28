import { SET_DATES, ADD_ACTIVITY_DATE } from "./types";

export function fetchDates(dates) {
  return {
    type: SET_DATES,
    payload: dates,
  };
}

export function addDate(activity, date) {
  return {
    type: ADD_ACTIVITY_DATE,
    payload: {
      activity,
      date,
    },
  };
}
