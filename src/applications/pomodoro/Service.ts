import { Device } from "@/core/entities/Device";

export default {
    getState: (selectedDevice:Device) => {
        return fetch(`http://${selectedDevice.ip}/pomodoro`).then(res => res.json());
    },
    setTimer: (selectedDevice:Device,hours: number, minutes: number, seconds: number) => { },
    startTimer: (selectedDevice:Device) => { },
    stopTimer: (selectedDevice:Device) => { },
    resetTimer: (selectedDevice:Device) => { },
}