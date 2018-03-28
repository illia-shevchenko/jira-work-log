const getTimeString = () => {
  const time = new Date().toISOString();
  return `[${ time }]`;
};

module.exports = {
  error(...args) {
    console.error(getTimeString(), ...args);
  },
  warn(...args) {
    console.warn(getTimeString(), ...args);
  },
  info(...args) {
    console.info(getTimeString(), ...args);
  },
  debug(...args) {
    console.debug(getTimeString(), ...args);
  },
  trace(...args) {
    console.trace(getTimeString(), ...args);
  },
};
