const dgram = require("dgram");

class UDPListener {
  constructor(mainWindow) {
    const socket = dgram.createSocket("udp4");
    socket.on("message", (msg) => {
      mainWindow.webContents.send("dataReceived", "" + msg);
    });
    socket.bind(42069);
  }
}

module.exports = UDPListener;
