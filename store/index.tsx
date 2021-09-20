import { createStore } from "redux";

export type StoreState = ReturnType<typeof reducer>;
type Action = { type: string };

const initial_satate = {
  is_modal_active: false,
};

const reducer = (state = initial_satate, action: Partial<Action>) => {
  switch (action.type) {
    case `active`:
      return {
        ...initial_satate,
        is_modal_active: true,
      };
    case `inactive`:
      return {
        ...initial_satate,
        is_modal_active: false,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
