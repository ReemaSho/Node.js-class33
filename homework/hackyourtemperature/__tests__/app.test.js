import { expect } from "@jest/globals";
import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);
//happy path
describe("POST /", () => {
  it("should response with a 200 status code ", async () => {
    const response = await request.post("/amsterdam").then((response) => {
      expect(response.status).toBe(200);
    });
  });

  it("should return the city name in the response", async () => {
    const response = await request
      .post("/amsterdam")

      .then((response) => {
        expect(response.body).toHaveProperty("cityName", "Amsterdam");
      });
  });
  it("should return temperature in the response", async () => {
    const response = await request
      .post("/amsterdam")

      .then((response) => {
        expect(response.body).toHaveProperty("temperature");
      });
  });
});

//unhappy path
describe("POST /", () => {
  it("should response with a 204 status code when the city not found ", async () => {
    const response = await request.post("/42").then((response) => {
      expect(response.status).toBe(404);
    });
  });

  it("should return city not found", async () => {
    const response = await request
      .post("/42")

      .then((response) => {
        expect(response.body).toHaveProperty("weatherText", "City not found!");
      });
  });
});
