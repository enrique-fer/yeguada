import { SET_FEATURES_CARDS } from "../actions/types";

const INITIAL_STATE = {
  featuresCards: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FEATURES_CARDS:
      const { links } = action.payload;
      return {
        ...state,
        featuresCards: links,
      };
    default:
      return state;
  }
}
