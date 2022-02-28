import { SET_NAVBAR_LINKS, SET_LINKS } from "./types";

export function setNavbarLinks(links) {
  return {
    type: SET_NAVBAR_LINKS,
    payload: {
      links,
    },
  };
}

export function setLinks(headLinks) {
  return {
    type: SET_LINKS,
    payload: {
      headLinks,
    },
  };
}
