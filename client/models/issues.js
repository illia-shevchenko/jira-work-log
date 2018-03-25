export const issues = {
  state: null,
  reducers: {
    set: (state, payload) => payload,
    clear: () => null,
  },
  selectors: {
    get: (state) => state,
  },
};
