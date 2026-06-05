const { BrowserWindow, screen } = require("electron");
const path = require("path");

class MainWindow extends BrowserWindow {
  constructor() {
    const workArea = screen.getPrimaryDisplay().workArea;
    const x = workArea.x;
    const y = workArea.y + workArea.height - 500;

    super({
      icon: path.join(__dirname, "../public/TheWayIcon.ico"),
      show: false,
      width: 300,
      height: 500,
      /////////////////////////////////////////////////////////////POSITION OF APP//////////////////////////////////////////////////////
      
      //x: 3800,
      //y: 0,

      x: 0,
      y: screen.getPrimaryDisplay().workAreaSize.height - 500, //0,

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      maximizable: false,
      resizable: false,
      transparent: true,
      frame: false,
      focusable: false,
      skipTaskbar: true,
    });

    this.setMenu(null);

    if (process.platform === "win32") {
      const WM_INITMENU = 0x0116;
      this.hookWindowMessage(WM_INITMENU, () => {
        this.setEnabled(false);
        this.setEnabled(true);
      });
    }

    this.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

    const reassertOnTop = () => {
      this.setAlwaysOnTop(true, "screen-saver");
    };

    reassertOnTop();

    this.on("ready-to-show", () => {
      try {
        this.showInactive();
      } catch {
        this.show();
      }
      reassertOnTop();
    });

    this.on("show", reassertOnTop);
    this.on("restore", () => {
      reassertOnTop();
    });
    this.on("blur", reassertOnTop);
  }
}

module.exports = MainWindow;
