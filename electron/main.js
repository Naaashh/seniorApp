const electron = require('electron');
const {app, BrowserWindow, Menu, Tray, ipcMain} = electron;
const fs = require('fs');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;
let splash;
let tray;

let actualData;
const iconPath = path.join(__dirname, '\\dist\\assets\\icon\\favicon.ico');
const resourcesDir = !app.commandLine.hasSwitch('dev') ? '../' : 'dist/assets/'

const useSplashScreen = !app.commandLine.hasSwitch('disable-splashScreen');

// if command doesn't ask for prod mod, switched to devMode
const isDevMode = app.commandLine.hasSwitch('dev');

/**
 * init electron app
 */
function init() {

  // create splashScreen is useSplashScreen is true
  if (useSplashScreen) {
    createSplash();
  }
  createWindow();
  createTray();
}

/**
 * create main window
 */
function createWindow() {

  // set icon on mac
  if(app.dock) {
    app.dock.setIcon(iconPath);
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1200,
    frame: false,
    icon: iconPath,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`,
      enableRemoteModule: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname,'\\dist\\index.html'));

  if (isDevMode) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', init);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Create splash Screen loading before window ready
 */
function createSplash() {
  // create splash screen
  splash = new BrowserWindow({width: 300, height: 400, transparent: true, frame: false, alwaysOnTop: true});
  splash.loadFile(path.join(__dirname, '\\dist\\assets\\static\\splash.html'));
}

function createTray() {
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'ouvrir', click:  _ => mainWindow.show() },
    { label: 'quitter', role: 'quit' },
  ]);
  tray.setToolTip('seniorApp');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', _ => mainWindow.show());
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
})

app.once('ready', () => {
  if(useSplashScreen) {
    splash.destroy();
  }
  mainWindow.show();
});

/**
 * execute command
 * @param command
 * @param callback
 */
function execute(command, callback) {
  require('child_process').exec(command, (error, stdout, stderr) => {
    callback(stdout,error);
  });
}

ipcMain.on('execute-command', (event, args) => {
  execute(args, output => {
    console.log(output);
  });
});

/**
 * read data from actual_data.json file
 */
ipcMain.on('get-data', event => {
  actualData = JSON.parse(fs.readFileSync(path.join(__dirname, resourcesDir, 'data/actual_data.json'), 'utf-8'));
  event.reply('get-data', actualData);
});

/**
 * read images credit from images_credit.json file
 */
ipcMain.on('get-images-credit', event => {
  actualData = JSON.parse(fs.readFileSync(path.join(__dirname, resourcesDir, 'data/images_credit.json'), 'utf-8'));
  event.reply('get-images-credit', actualData);
});

/**
 * modify applications from actual_data.json file
 */
ipcMain.on('modify-data', (event, data) => {
  actualData = {...actualData, ...data};
  fs.writeFileSync(path.join(__dirname, resourcesDir, 'data/actual_data.json'), JSON.stringify(actualData));
});

/**
 * reset data from default_data.json file
 */
ipcMain.on('reset-data', event => {
  actualData = JSON.parse(fs.readFileSync(path.join(__dirname, resourcesDir, 'data/default_data.json'), 'utf-8'));
  fs.writeFileSync(path.join(__dirname, resourcesDir, 'data/actual_data.json'), JSON.stringify(actualData));

  event.reply('reset-data', actualData);
});

/**
 * add image to images folder
 */
ipcMain.on('add-image', (event, data) => {
  const buffered = Buffer.from(data.image.split(';base64,').pop(), 'base64');
  fs.writeFileSync(path.join(__dirname, resourcesDir, 'images/' + data.name), buffered);
});
