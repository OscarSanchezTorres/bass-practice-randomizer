const { defineConfig } = require("cypress");
let composeContainer;

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  video: true,
  reporterOptions: {
    embeddedScreenshots: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      on("before:run", async (details) => {
        const composeFilePath = path.resolve(__dirname, "../../d");
        const composeFile = "docker-compose.yml";

        composeContainer = await new DockerComposeEnvironment(
          composeFilePath,
          composeFile
        )
          .withWaitStrategy(
            "flyway-1",
            Wait.forLogMessage(/^Successfullyapplied/)
          )
          .up();
        await new Promise((x) => setTimeout(x, 500));
      });

      on("after:run", async(details) => {
        await composeContainer?.down();
      }
    }
  }
});
