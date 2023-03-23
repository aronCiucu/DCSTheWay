const dgram = require("dgram");

class UDPListener {
  constructor(mainWindow) {
    const socket = dgram.createSocket("udp4");
    socket.on("message", (msg) => {
      try {
        mainWindow.webContents.send("dataReceived", "" + msg);
      } catch (e) {}
    });
    socket.bind(42069);
  }
}

module.exports = UDPListener;
