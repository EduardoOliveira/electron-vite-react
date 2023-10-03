import { createContext } from "react";
import { Device } from "@/core/entities/Device";

export interface SelectedDeviceContext {
    selectedDevice: Device | null;
    setSelectedDevice: (device: Device) => void;
}

export const SelectedDevice = createContext<SelectedDeviceContext>({
    selectedDevice: null,
    setSelectedDevice: () => {},
});