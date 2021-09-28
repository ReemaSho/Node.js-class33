import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe("POST /", () => {
  it("should response with a 200 status code ", async () => {
    const response = await request
      .post("/weather")
      .field("cityName", "Amsterdam");
    expect(response.status).toBe(200);
  });

  // it("should return the city name in the response", async () => {
  //   const response = await request
  //     .post("/weather")
  //     .field("cityName", "Amsterdam");
  //   expect(response.body).to.stringContaining("Amsterdam");
  // });
});
