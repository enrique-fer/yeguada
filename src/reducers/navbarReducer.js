import { SET_NAVBAR_LINKS, SET_LINKS } from "../actions/types";

const INITIAL_STATE = {
  navbarLinks: [],
  headers: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_NAVBAR_LINKS:
      const { links } = action.payload;
      return {
        ...state,
        navbarLinks: links,
      };
    case SET_LINKS:
      const { headLinks } = action.payload;
      return {
        ...state,
        headers: headLinks,
      };
    default:
      return state;
  }
}
