const { Tray, Menu } = require("electron");
const path = require("path");

let tray = null;

function createTray(mainWindow) {
  tray = new Tray(path.join(__dirname, "../assets/tray-icon.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show FALIZ AI",
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        }
      },
    },
    {
      label: "Quit FALIZ AI",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("FALIZ AI");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
}

module.exports = { createTray };
