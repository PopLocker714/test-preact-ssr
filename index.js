import uWS from "uWebSockets.js";
// import render from "preact-render-to-string";
// import { html } from "htm/preact";

const PORT = +process.env.PORT || 9001;
const HOST = process.env.HOST || "localhost";

uWS
  ./*SSL*/ App()
  .addServerName(HOST, {})
  .get("/*", async (res, req) => {
    /* Can't return or yield from here without responding or attaching an abort handler */
    res.onAborted(() => {
      res.aborted = true;
    });

    let r = `<!DOCTYPE html>
      <html>
        <body>
          ${123}
        </body>
      </html>
      `;

    /* If we were aborted, you cannot respond */
    if (!res.aborted) {
      res.cork(() => {
        res.end(r);
      });
    }
  })
  // .domain(HOST)
  .listen(PORT, (token) => {
    if (token) {
      console.log("Listening to port " + PORT);
    } else {
      console.log("Failed to listen to port " + PORT);
    }
  });
