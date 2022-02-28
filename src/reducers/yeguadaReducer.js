import {
  SET_HORSES,
  SET_HORSES_CONTENT,
  CHANGE_HORSES_CONTENT,
} from "../actions/types";

const INITIAL_STATE = {
  horses: [],
  horsesContent: [],
  horse: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_HORSES:
      const { horses, onClick } = action.payload;
      return {
        ...state,
        horses: horses,
        onClick: onClick,
      };
    case SET_HORSES_CONTENT:
      return {
        ...state,
        horsesContent: action.payload,
      };
    case CHANGE_HORSES_CONTENT:
      const { id, horse } = action.payload;
      const horsesContent = state.horsesContent.map((link) => {
        link.active = false;

        if (link._id == id) {
          link.active = true;
        }

        return link;
      });

      return {
        ...state,
        horsesContent: horsesContent,
        horse: horse,
      };
    default:
      return state;
  }
}
