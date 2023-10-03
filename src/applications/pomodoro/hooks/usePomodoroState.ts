import { Device } from "@/core/entities/Device";
import useData from "@/core/hooks/utils/useData";
import { useState, useCallback } from "react";
import { Pomodoro } from "../entities/Entities";

type Action = {
    type: 'get' | 'start' | 'stop' | 'reset' | 'set',
    payload?: {
        hours: number,
        minutes: number,
        seconds: number
    }
};

export default function usePomodoroState(selectedDevice: Device) {
    const [state, setState] = useState<Pomodoro>({} as Pomodoro);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [action, setAction] = useState<Action>({ type: 'get' });

    const fetchPomodoroState = useCallback(async () => {
        try {
            setLoading(true);
            let params = '?';
            if ((action.type === 'set' || action.type === 'start') && action.payload) {
                params = `?duration=${action.payload?.hours * 3600 + action.payload?.minutes * 60 + action.payload?.seconds}&`
            }
            params += `${action.type}=true`;
            const res = await fetch(`http://${selectedDevice.ip}/pomodoro${params}`);
            const json = await res.json();
            const p ={
                ...json,
                hours: json.duration / 3600 | 0,
                minutes: json.duration / 60 | 0,
                seconds: json.duration % 60,
            } as Pomodoro;
            console.log(p);
            setState(p);
        } catch (error) {
            console.error(error);
            setError(new Error('Failed to fetch pomodoro state'));
        } finally {
            setLoading(false);
        }
    }, [action.type, selectedDevice]);

    useData(fetchPomodoroState);

    return {
        state,
        loading,
        error,
        doAction: (action: Action) => {
            setAction(action);
        }
    }
}