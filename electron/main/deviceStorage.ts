import { Device } from "@/core/entities/Device";
import electron from "electron";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const dataPath = electron.app.getPath('userData');
const filePath = path.join(dataPath, 'devices.json');

function parseData(): Device[] {
    const defaultData: Device[] = [];
    console.log(filePath);
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
        return defaultData;
    }
}

export function setupDeviceStorage(ipcMain: Electron.IpcMain) {
    ipcMain.handle('get-devices', async () => {
        return await parseData();
    });
    ipcMain.handle('get-device', async (_, deviceId: string) => {
        console.log(deviceId);
        return parseData().filter(device => device.id === deviceId)[0];
    });
    ipcMain.handle('get-selected-device', async () => {
        const devices = parseData();
        const d = devices.filter(device => device.selected)[0];
        if(!d){
            return devices[0];
        }   
        return d;
    });
    ipcMain.handle('save-device', async (_, device: Device) => {
        const devices = await parseData();
        console.log('loaded devices')
        if (!device.id) {
            device.id = crypto.randomUUID()
        }
        if (devices.filter(d => d.id === device.id).length > 0) {
            console.log('updating device');
            devices.splice(devices.findIndex(d => d.id === device.id), 1);
        }else{
            console.log('adding device');
        }
        devices.push(device);
        console.log(devices);
        fs.writeFileSync(filePath, JSON.stringify(devices));
        console.log('saved devices');
    });
}