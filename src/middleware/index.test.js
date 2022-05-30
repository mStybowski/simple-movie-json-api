/* eslint-env jest */
const request = require("supertest");
const { server } = require("../server");

describe("Get endpoint", () => {
  it("should fail getting movie", async () => {
    await request(server).get("/get?duration=").expect(400);
    await request(server).get("/get?genres=").expect(400);
    await request(server).get("/get?duration=&genres=").expect(400);
  });
});
