import fetch from "node-fetch";
/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */

const makeReservation = async () => {
  try {
    const request = await fetch(
      "https://reservation100-sandbox.mxapps.io/api/reservations",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Reema sho",
          numberOfPeople: 3,
        }),
      }
    );

    if (request.status === 200) {
      const reservations = await request.json();
      console.log(reservations);
    } else throw new Error(`${request.statusText}: ${request.status}`);
  } catch (error) {
    console.log(error);
  }
};

makeReservation();
