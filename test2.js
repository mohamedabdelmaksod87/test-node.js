const express = require("express");
const app = express();

/*in this test calling the 1st endpoint blocks!! the main thread, hence if we tried to call the 2nd endpoint immediately from a new tab in browser after calling the 1st endpoint we don't get the response until the 1st endpoint finish first which is a blocking behaviour although the 1st endpint middleware is asynchrounous.
i believe node.js shouldn't block the 2nd endpoint.
Please correct me if i am wrong ?? */

//takes almost 10 sec to execute
const delayFnc = () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 10000; i++) {
      for (let j = 0; j < 3000_000; j++) {}
    }
    resolve();
  });
};

app.get("/first", async (req, res) => {
  await delayFnc();
  res.send("Hello from 1st endpoint");
});

app.get("/second", (req, res) => {
  res.send("Hello from 2nd endpoint");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
