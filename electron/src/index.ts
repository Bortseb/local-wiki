import { app, BrowserWindow, shell } from 'electron'
import * as path from 'path'

import * as http from 'http'
// import wiki-server
import * as server from 'wiki-server'

// import log from 'electron-log'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) {
// eslint-disable-line global-require
// app.quit()
// }

const BACKGROUND_COLOR = '#fbf9f7'

const MAIN_FILE = path.join(__dirname, '../web/index.html')
// const LINUX_ICON_FILE = path.join(
//   __dirname,
//   '../web/logo/acorn-logo-desktop-512px.png'
// )

const UI_URL = 'http://localhost:3400'

const createMainWindow = (): BrowserWindow => {
  // Create the browser window.
  const options: Electron.BrowserWindowConstructorOptions = {
    height: 1080,
    width: 1920,
    show: false,
    backgroundColor: BACKGROUND_COLOR,
    // use these settings so that the ui
    // can check paths
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: false,
    },
  }
  // if (process.platform === 'linux') {
  //   options.icon = LINUX_ICON_FILE
  // }
  const mainWindow = new BrowserWindow(options)
  mainWindow.loadURL(UI_URL)

  // Open <a href='' target='_blank'> with default system browser
  mainWindow.webContents.on('new-window', function (event, url) {
    event.preventDefault()
    shell.openExternal(url)
  })
  // once its ready to show, show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // start up the wiki-server

  // The directory for storing your app's data and config files,
  // which by default it is the appData directory appended with your app's name.
  const userDataPath = app.getPath('userData')

  // define config
  let config = {
      port: 3400,
      root: path.dirname(require.resolve('wiki-server')),
      home: 'welcome-visitors',
      // security_type: './security',
      security_legacy: true,
      data: userDataPath,
      packageDir: path.resolve(path.join(__dirname, '..', 'node_modules')),
      cookieSecret: require('crypto').randomBytes(64).toString('hex'),
  }
  let wikiapp = server(config)
  wikiapp.on('owner-set', (e) => {
    let server = new http.Server(wikiapp)
    let serv = server.listen(wikiapp.startOpts.port, wikiapp.startOpts.host)
    console.log("Federated Wiki server listening on", wikiapp.startOpts.port, "in mode:", wikiapp.settings.env)
    // if argv.security_type is './security'
    // console.log 'INFORMATION : Using default security - Wiki will be read-only\n'
    wikiapp.emit('running-serv', serv)
  })

  createMainWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})
