import fetch from "node-fetch";

/**
 * 1. Chuck Norris programs do not accept input
 *
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console.
 * Make use of `async/await` and `try/catch`
 *
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */

const printChuckNorrisJoke = async () => {
  try {
    const request = await fetch("http://api.icndb.com/jokes/random");
    console.log(request);

    if (request.status === 200) {
      const jokes = await request.json();
      console.log(jokes.value.joke);
    } else {
      throw new Error(jokes.type);
    }
  } catch (error) {
    console.log(error);
  }
};

printChuckNorrisJoke();
