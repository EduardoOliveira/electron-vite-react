
import { useNavigate } from "react-router-dom";

export function Error404(){
    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(-1)}>
            <h1>{location.pathname} - 404</h1>
        </div>
    )
}