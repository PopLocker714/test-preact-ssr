import uWS from "uWebSockets.js";
import render from "preact-render-to-string";
import { html } from "htm/preact";

function delay(t, val) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(val);
    }, t);
  });
}

async function someAsyncTask(headers) {
  const items = [];
  headers.forEach((k, v) => {
    console.log(k, v);
    items.push(`<li>${k} = ${v}</li>`);
  });
  const res = `
    <h2>Hello, your headers are:</h2>
    <ul>
      ${items.toString().replaceAll(",", "")}
    </ul>
    `;
  return delay(500, res);
}

const port = 9001;

uWS
  ./*SSL*/ App({})
  .get("/*", async (res, req) => {
    /* Can't return or yield from here without responding or attaching an abort handler */
    res.onAborted(() => {
      res.aborted = true;
    });

    const body = render(html`<h1>Hello from Preact</h1>`);

    /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */

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
