import { IconButton } from "@mui/joy";
import CloseIcon from '@mui/icons-material/Close';
import { ipcRenderer } from "electron";


export function CloseButton() {
    const close = () =>{
        ipcRenderer && ipcRenderer.send('close');
    }
    return (
        <IconButton
            size="sm"
            variant="soft"
            color="neutral"
            onClick={()=>close()}
        >
            <CloseIcon />
        </IconButton>
    )
}