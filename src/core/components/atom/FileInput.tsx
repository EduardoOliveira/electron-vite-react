import { Button, Input } from "@mui/joy"

interface FileInputProps {
    onChange: (e: Event) => void
    label: string
    accept: string
}


export default function FileInput({ onChange,label, ...props }:FileInputProps) {
    const onClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = props.accept;
        input.onchange = onChange;
        input.click();
    }
    return (
        <Button onClick={onClick} {...props}>{label}</Button>
    )
}