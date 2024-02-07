const net = require("net");
const { ipcMain } = require("electron");

class TCPSender {
  constructor() {
    ipcMain.on("messageToDcs", (event, msg) => {
      let client = new net.Socket();
      client
        .connect(42070, "127.0.0.1", function () {
          client.write(JSON.stringify(msg) + "\n");
        })
        .on("error", (e) => {
          console.log(e);
        });
    });
  }
}

module.exports = TCPSender;
