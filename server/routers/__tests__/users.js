const request = require("supertest");
const app = require("../../app");

describe("/users", () => {
  describe("GET /users", () => {
    it("respond with json containing a list of a users", async () => {
      await request(app)
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});