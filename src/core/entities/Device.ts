export type Device = {
    id: string | null;
    ip: string;
    selected: boolean;
    shadow: Shadow|null;
}

export type Shadow = {
    bootTime: Date;
    lastSeen: Date;
    name: string;
    version: string;
}

export function newDevice(ip: string): Device {
    return {
        id: null,
        ip,
        selected: false,
        shadow: null
    }
}