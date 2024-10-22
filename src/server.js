import uWS from "uWebSockets.js";
import render from "preact-render-to-string";
import { html } from "htm/preact";
import PreactApp from "./components/PreactApp.js";

const port = 9001;

uWS
  .App({})
  .get("/*", async (res, req) => {
    res.onAborted(() => {
      res.aborted = true;
    });

    const body = render(html`
      <h1>Hello from Preact</h1>
      <${PreactApp} />
    `);

    let r = `<!DOCTYPE html>
      <html>
        <body>
          ${body}
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
  .listen(port, (token) => {
    if (token) {
      console.log("Listening to port " + port);
    } else {
      console.log("Failed to listen to port " + port);
    }
  });
