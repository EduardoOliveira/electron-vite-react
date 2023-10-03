import { IconButton } from "@mui/joy";
import CropSquareIcon  from '@mui/icons-material/CropSquare';
import { ipcRenderer } from "electron";


export function MaximizeButton() {

    const maximize = () =>{
        ipcRenderer && ipcRenderer.send('maximize');
    }

    return (
        <IconButton
            size="sm"
            variant="soft"
            color="neutral"
            onClick={()=>maximize()}
        >
            <CropSquareIcon />
        </IconButton>
    )
}