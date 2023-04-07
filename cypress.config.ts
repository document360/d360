import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        specPattern: "cypress/*.cy.ts",
        supportFile: "cypress/support/e2e.ts",
    },
    video: false,
    projectId: "gk7tue", // cypress dashboard free project
});
