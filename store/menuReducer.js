const initialState = {
  action: 'openMenu'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_MENU':
      return {
        ...state,
        action: 'closeMenu'
      };
    default:
      return state;
  }
};

export default reducer;
