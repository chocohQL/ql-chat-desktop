const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

function createWindow() {
    const dev = true;
    const openDevTools = true;
    const win = new BrowserWindow({
        width: 300,
        height: 400,
        resizable: false,
        minimizable: false,
        maximizable: false,
        movable: true,
        frame: false,
        transparent: true,
        icon: path.join("dist/icon.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    win.setMenu(null)
    if (dev) {
        const elePath = path.join(__dirname,'../node_modules/electron')
        require('electron-reload')('../', {
            electron: require(elePath),
        })
        win.loadURL('http://localhost:8889')
    } else {
        win.loadFile('dist/index.html')
    }
    if (openDevTools) {
        win.webContents.openDevTools()
    }
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('window-min', () => {
    BrowserWindow.getFocusedWindow().minimize()
})

ipcMain.on('window-close', () => {
    BrowserWindow.getFocusedWindow().close()
    app.quit()
})

ipcMain.on('window-resize-login', () => {
    BrowserWindow.getFocusedWindow().setSize(300, 400
    )
})

ipcMain.on('window-resize-home', () => {
    BrowserWindow.getFocusedWindow().setSize(1000, 650
    )
})

ipcMain.on('always-on-top-true', () => {
    BrowserWindow.getFocusedWindow().setAlwaysOnTop(true)
})

ipcMain.on('always-on-top-false', () => {
    BrowserWindow.getFocusedWindow().setAlwaysOnTop(false)
})
