export const OBJECTIVES_INITIAL_STATE = {
  fetching: false,
  error: null,
  objectives: []
};

export const objectivesReducer = (state = OBJECTIVES_INITIAL_STATE, action) => {
  switch(action.type) {
    default: {
      return state;
    }
  }
}

export default objectivesReducer;
