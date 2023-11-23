import ImageEditor from "@/core/components/ImageEditor"
import Layout from "@/core/components/Layout"
import FileInput from "@/core/components/atom/FileInput"
import { Button } from "@mui/joy"
import { useState } from "react"

export function EditFaces() {
    const [file, setFile] = useState<File | null>(null)

    return (<>
        <Layout.Main>
            <h1>editFaces</h1>
            <ImageEditor width={32} height={32} defaultUrl="/32x32.png" file={file} />
            <FileInput label='Select Image' accept='image/png' onChange={e => setFile(e.target?.files[0])} />
            <Button onClick={()=>setFile(null)}>Reset</Button>
            <Button>Apply</Button>
        </Layout.Main>
    </>)
}