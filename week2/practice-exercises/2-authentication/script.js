import fetch from "node-fetch";
/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
const printBooks = async () => {
  try {
    const request = await fetch(
      "https://restapiabasicauthe-sandbox.mxapps.io/api/books",
      {
        headers: { Authorization: "Basic YWRtaW46aHZnWDhLbFZFYQ==" },
      }
    );
    console.log(request);
    const books = await request.json();
    if (request.status === 200) {
      console.log(books);
    } else throw new Error("bad Request");
  } catch (error) {
    console.log(error);
  }

  // YOUR CODE GOES IN HERE
};

printBooks();
