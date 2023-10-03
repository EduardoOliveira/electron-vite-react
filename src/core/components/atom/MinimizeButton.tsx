import { IconButton } from "@mui/joy";
import MinimizeIcon from '@mui/icons-material/Minimize';
import { ipcRenderer } from "electron";


export function MinimizeButton() {
    const minimize = () =>{
        ipcRenderer && ipcRenderer.send('minimize');
    }
    return (
        <IconButton
            size="sm"
            variant="soft"
            color="neutral"
            onClick={()=>minimize()}
        >
            <MinimizeIcon />
        </IconButton>
    )
}