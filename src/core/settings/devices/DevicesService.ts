import { Device, Shadow } from '@/core/entities/Device';
import { ipcRenderer } from 'electron';

export default {
  getDevices: () => {
    return ipcRenderer.invoke('get-devices');
  },
  getDevice: (deviceId: string) => {
    console.log(deviceId);
    return ipcRenderer.invoke('get-device', deviceId);
  },
  getSelectedDevice: () => {
    return ipcRenderer.invoke('get-selected-device');
  },
  saveDevice: async (device: Device) => {
    const qString = `?name=${device.shadow?.name}`
    return fetch(`http://${device.ip}/shadow${qString}`).then(res => {
      console.log(res);
      if (res.status === 200) {
        ipcRenderer.invoke('save-device', device);
      }
    });
  },
  deleteDevice: (deviceId: string) => {
    return ipcRenderer.invoke('delete-device', deviceId);
  },
  getShadow: async (ip: string) => {
    return fetch(`http://${ip}/shadow`).then(res => res.json()).then(shadow => {
      shadow.lastUpdate = new Date();
      shadow.bootTime = new Date(shadow.bootTime * 1000);
      return shadow;
    }) as Promise<Shadow>;
  }
};