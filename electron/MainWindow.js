const { BrowserWindow, screen } = require("electron");
const path = require("path");
const Store = require("electron-store");

const WINDOW_WIDTH = 300;
const WINDOW_HEIGHT = 500;
const WINDOW_POSITION_KEY = "windowPosition";

const store = new Store();

const getDefaultPosition = () => {
  const workArea = screen.getPrimaryDisplay().workArea;

  return {
    x: workArea.x,
    y: workArea.y + workArea.height - WINDOW_HEIGHT,
  };
};

const isSavedPositionUsable = (position) => {
  if (
    !position ||
    !Number.isFinite(position.x) ||
    !Number.isFinite(position.y)
  ) {
    return false;
  }

  return screen.getAllDisplays().some((display) => {
    const bounds = display.workArea;

    return (
      position.x < bounds.x + bounds.width &&
      position.x + WINDOW_WIDTH > bounds.x &&
      position.y < bounds.y + bounds.height &&
      position.y + WINDOW_HEIGHT > bounds.y
    );
  });
};

const getStartupPosition = () => {
  const savedPosition = store.get(WINDOW_POSITION_KEY);

  if (isSavedPositionUsable(savedPosition)) {
    return savedPosition;
  }

  return getDefaultPosition();
};

class MainWindow extends BrowserWindow {
  constructor() {
    const position = getStartupPosition();

    super({
      icon: path.join(__dirname, "../public/TheWayIcon.ico"),
      show: false,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,

      x: position.x,
      y: position.y,

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
    this.on("restore", reassertOnTop);
    this.on("blur", reassertOnTop);

    this.on("close", () => {
      const [x, y] = this.getPosition();
      store.set(WINDOW_POSITION_KEY, { x, y });
    });
  }
}

module.exports = MainWindow;
