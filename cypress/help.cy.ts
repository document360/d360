import { } from "../src/commands/baseCommand";

describe("Global help command", () => {
    before(() => {
        const test = cy.spy(console, "info");
        console.log(test.args[0]);
    })

    it("test", () => {
        const test = cy.spy(console, "info");
        console.log(test.args[0]);
    });
});