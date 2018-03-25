export const createStorage = (key) => ({
  set(data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save ${ key } to a persistent storage`, error); // eslint-disable-line no-console
    }
  },

  get(defaults) {
    try {
      return JSON.parse(localStorage.getItem(key)) || defaults;
    } catch (error) {
      this.remove();
      console.error(`Failed to get ${ key } to a persistent storage`, error); // eslint-disable-line no-console
      return defaults;
    }
  },

  remove() {
    localStorage.removeItem(key);
  },
});
