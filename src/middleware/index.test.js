/* eslint-env jest */
const request = require("supertest");
const { server } = require("../server");

describe("Get endpoint", () => {
  it("should fail getting movie when no value for GET queries provided", async () => {
    await request(server).get("/get?duration=").expect(400);
    await request(server).get("/get?genres=").expect(400);
    await request(server).get("/get?duration=&genres=").expect(400);
  });

  it("should not fail getting movie when GET queries are correct", async () => {
    await request(server)
      .get("/get?duration=120")
      .expect("Content-Type", /json/)
      .expect(200);
    await request(server)
      .get("/get?genres=Action,Crime")
      .expect("Content-Type", /json/)
      .expect(200);
    await request(server)
      .get("/get")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("should fail adding movie with invalid or incomplete POST body", async () => {
    await request(server)
      .post("/add")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);
    await request(server)
      .post("/add")
      .send({ title: "someTitle" })
      .expect("Content-Type", /json/)
      .expect(400);
    await request(server)
      .post("/add")
      .send({ title: "someTitle", genres: ["Action"] })
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
