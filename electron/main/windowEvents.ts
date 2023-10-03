import { BrowserWindow } from "electron/main";

export function setupWindowEvents(win: BrowserWindow, ipcMain: Electron.IpcMain){
    ipcMain.on('minimize', () => win.isMinimized() ? win.restore() : win.minimize())
    ipcMain.on('close', () => win.close())
    ipcMain.on('maximize', () => win.isMaximized() ? win.unmaximize() : win.maximize())
}