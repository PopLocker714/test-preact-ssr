import uWS from "uWebSockets.js";
import render from "preact-render-to-string";
import { html } from "htm/preact";
import PreactApp from "./components/PreactApp.js";

const PORT = process.env.PORT || 9001;
const HOST = process.env.HOST || "localhost";

const app = uWS
  .App()
  .missingServerName((hostname) => {
    /* Note: You don't have to use this callback but can pre-load
     * relevant server names up front. This callback is not "async",
     * you either add the server name HERE IMMEDIATELY, or the hangshake
     * will continue with default certificate (which will most likely fail) */

    console.log("Hello! We are missing server name <" + hostname + ">");

    app.addServerName(HOST, {});
  })
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
  .listen(PORT, (token) => {
    if (token) {
      console.log("Listening to port " + PORT);
    } else {
      console.log("Failed to listen to port " + PORT);
    }
  });
