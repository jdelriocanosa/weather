const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'wenimo',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
