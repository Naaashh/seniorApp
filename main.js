const electron = require('electron')
const {app, BrowserWindow, Menu, Tray, ipcMain, dialog, remote} = electron;
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;
let splash;
let tray;

const useSplashScreen = !app.commandLine.hasSwitch('disable-splashScreen');

// if command doesn't ask for prod mod, switched to devMode
const isDevMode = app.commandLine.hasSwitch('dev');

const iconPath = 'dist/assets/icon/favicon.ico'

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
      preload: './preload.js',
      enableRemoteModule: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('dist/index.html');

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
  })
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
  splash = new BrowserWindow({width: 600, height: 800, transparent: true, frame: false, alwaysOnTop: true});
  splash.loadFile('dist/assets/static/splash.html');
}

function createTray() {
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([

    { label: 'open', click:  _ => mainWindow.show() },
    { label: 'exit', role: 'quit' },
  ])
  tray.setToolTip('seniorApp')
  tray.setContextMenu(contextMenu)

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
 * executre command
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
 * read data from actual_list.json file
 */
ipcMain.on('get-data', event => {
  event.reply('get-data', JSON.parse(fs.readFileSync(`${__dirname}\\dist\\assets\\data\\actual_list.json`, 'utf-8')));
});

/**
 * modify data from actual_list.json file
 */
ipcMain.on('modify-data', (event, data) => {
  fs.writeFileSync(`${__dirname}\\dist\\assets\\data\\actual_list.json`, JSON.stringify(data));
});

/**
 * reset data from default_list.json file
 */
ipcMain.on('reset-data', event => {
  const default_data = fs.readFileSync(`${__dirname}\\dist\\assets\\data\\default_list.json`, 'utf-8');
  fs.writeFileSync(`${__dirname}\\dist\\assets\\data\\actual_list.json`, default_data);

  event.reply('reset-data', JSON.parse(default_data));
});

ipcMain.on('add-image', (event, data) => {
  const buffered = Buffer.from(data.image.split(';base64,').pop(), 'base64');
  fs.writeFileSync(`${__dirname}\\dist\\assets\\images\\${data.name}`, buffered);
});
