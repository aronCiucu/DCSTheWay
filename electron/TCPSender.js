const net = require("net");
const { ipcMain } = require("electron");

function sendTcpMessage(msg, expectResponse = false) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    let responseBuffer = "";
    let finished = false;

    const finish = (fn, value) => {
      if (finished) return;
      finished = true;
      try {
        client.destroy();
      } catch {}
      fn(value);
    };

    client.setTimeout(expectResponse ? 5000 : 3000);

    client
      .connect(42070, "127.0.0.1", function () {
        client.write(JSON.stringify(msg) + "\n");

        if (!expectResponse) {
          client.end();
        }
      })
      .on("data", (data) => {
        responseBuffer += data.toString();
      })
      .on("end", () => {
        if (!expectResponse) {
          finish(resolve, null);
          return;
        }

        const trimmed = responseBuffer.trim();
        if (!trimmed) {
          finish(resolve, null);
          return;
        }

        try {
          finish(resolve, JSON.parse(trimmed));
        } catch {
          finish(resolve, { raw: trimmed });
        }
      })
      .on("timeout", () => {
        finish(reject, new Error("TCP request timed out"));
      })
      .on("error", (e) => {
        finish(reject, e);
      });
  });
}

class TCPSender {
  constructor() {
    ipcMain.on("messageToDcs", (_event, msg) => {
      sendTcpMessage(msg, false).catch((e) => {
        console.log(e);
      });
    });

    ipcMain.handle("messageToDcsRequest", async (_event, msg) => {
      return await sendTcpMessage(msg, true);
    });
  }
}

module.exports = TCPSender;
