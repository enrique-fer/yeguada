import { SET_DATES, ADD_ACTIVITY_DATE } from "../actions/types";

const INITIAL_STATE = {
  dates: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DATES:
      const dates = action.payload;
      return {
        ...state,
        dates,
      };
    case ADD_ACTIVITY_DATE:
      var exists = false;
      const newDate = action.payload;
      var ldates = [];
      state.dates.map((date) => {
        if (date.date.getTime() == newDate.date.getTime()) {
          exists = true;
        }

        ldates.push(date);
      });

      if (!exists) {
        ldates.push({
          _id: state.dates.length + 1,
          actividad: newDate.activity,
          fecha: newDate.date,
        });
      }

      return {
        ...state,
        dates: ldates,
      };
    default:
      return state;
  }
}
