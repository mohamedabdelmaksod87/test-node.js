const express = require("express");
const app = express();

/*in this test calling the 1st endpoint doesn't block the main thread, hence if we tried to call the 2nd endpoint immediately from a new tab in browser after calling the 1st endpoint we get the response from 2nd endpoint immediately */

app.get("/first", (req, res) => {
  setTimeout(() => {
    res.send("Hello from 1st endpoint");
  }, 10000); //10 sec delay
});

app.get("/second", (req, res) => {
  res.send("Hello from 2nd endpoint");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
