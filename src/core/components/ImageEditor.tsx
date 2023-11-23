import { Checkbox, Slider } from "@mui/joy";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/utils/useDebounce";


interface ImageEditorProps {
    defaultUrl: string
    width: number
    height: number
    file: File | null
    onImageChange?: (s: string) => void
}

export default function ImageEditor({ defaultUrl, width, height, onImageChange, file }: ImageEditorProps) {
    const [imgReady, setImgReady] = useState(false)
    const [source, setSource] = useState(defaultUrl)
    const [exported, setExported] = useState('')
    const [inverted, setInverted] = useState(false)
    const [alphaThreshold, setAlphaThreshold] = useState(255)
    const debouncedAlphaThreshold = useDebounce(alphaThreshold, 500);
    const [contrastThreshold, setContrastThreshold] = useState(127);
    const debouncedContrastThreshold = useDebounce(contrastThreshold, 500);


    const canvasRef = useRef(null);
    const canvasSmRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        console.log(file)
        if (!file) {
            setSource(defaultUrl)
            return
        }
        if (file.type !== 'image/png') return
        const reader = new FileReader();
        reader.onload = (e) => {
            setSource(e.target.result as string);
        }
        reader.readAsDataURL(file);
    }, [file])

    useEffect(() => {
        let i = imgRef.current || {} as HTMLImageElement;
        if (!i) return;
        if (i.width !== width || i.height !== height) {
            console.log(i.width, width, i.height, height)
        }
        const canvas = canvasSmRef.current || {} as HTMLCanvasElement;
        const ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
        ctx.reset();
        var scale = Math.min(width / i.width, height / i.height);
        var x = (canvas.width / 2) - (i.width / 2) * scale;
        var y = (canvas.height / 2) - (i.height / 2) * scale;
        ctx.drawImage(i, 0, 0, i.width * scale, i.height * scale);

        const bigCtx = (canvasRef.current|| {} as HTMLCanvasElement).getContext('2d') || {} as CanvasRenderingContext2D;
        bigCtx.reset();
        const data = ctx.getImageData(0, 0, width, height).data;

        let positionalData = [];
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let pixel = width * i + j;
                let position = pixel * 4;
                let red = data[position];
                let green = data[position + 1];
                let blue = data[position + 2];
                let alpha = data[position + 3];
                if (inverted) {
                    red = 255 - red;
                    green = 255 - green;
                    blue = 255 - blue;
                }
                bigCtx.fillStyle = `rgba(0,0,0,255)`;
                if (alpha < alphaThreshold) {
                    bigCtx.fillStyle = `rgba(255,255,255,0)`;
                    positionalData.push(0);
                }else if ((red + green + blue) / 3 < debouncedContrastThreshold) {
                    positionalData.push(1);
                    bigCtx.fillRect(j * 10, i * 10, 10, 10);
                }else{
                    positionalData.push(0);
                }
            }
        }
        let bla = '';
        for (let i = 0; i < positionalData.length / 8; i++) {
            let byte = positionalData.slice(i * 8, i * 8 + 8);
            let hexa = parseInt(byte.join(''), 2).toString(16).toUpperCase();
            if (hexa.length === 1) {
                hexa = '0' + hexa;
            }
            bla += '\\x' + hexa;
        }
        setExported(bla);

    }, [source, imgReady, inverted, debouncedAlphaThreshold, debouncedContrastThreshold]);

    useEffect(() => {
        onImageChange && onImageChange(exported);
    }, [exported])

    return (
        <>
            <div style={{ backgroundColor: 'grey' }}>
                <img ref={imgRef} src={source} alt="" style={{ width, height }} onLoad={() => setImgReady(true)} onChange={() => setImgReady(false)} />
                <canvas ref={canvasSmRef} id="canvas" style={{ border: 'solid 1px yellow' }} height={height} width={width}></canvas>
                <canvas ref={canvasRef} id="canvas" style={{ border: 'solid 1px green' }} height={height * 10} width={width * 10}></canvas>
                <textarea rows={10} cols={20} value={exported} readOnly></textarea>
                <input type="number" min={0} max={255} value={alphaThreshold} onChange={(e) => setAlphaThreshold(e.target.value)} />
                <Slider value={alphaThreshold} onChange={(e, v) => setAlphaThreshold(v as number)} min={0} max={255}/>
                <input type="number" min={0} max={255} value={contrastThreshold} onChange={(e) => setContrastThreshold(e.target.value)} />
                <Slider value={contrastThreshold} onChange={(e, v) => setContrastThreshold(v as number)} min={0} max={255}/>
                <Checkbox checked={inverted} onChange={e => setInverted(e.target.checked)} />
            </div>
        </>
    )
}