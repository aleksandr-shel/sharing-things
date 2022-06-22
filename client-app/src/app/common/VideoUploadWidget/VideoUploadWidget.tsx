import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import {AiOutlineUpload} from 'react-icons/ai';

interface Props{
    setFiles: (files: File)=>void;
    setSrc: (src: any) => void;
}

export default function VideoUploadWidget({setFiles, setSrc}:Props){

    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        height: 300
    }

    const dzActive = {
        borderColor: 'lightblue'
    }

    const onDrop = useCallback((acceptedFiles) => {
        
        acceptedFiles.forEach((file: File)=>{
            const reader = new FileReader()

            reader.onload = ()=>{
                setSrc(reader.result)
            }
            reader.readAsDataURL(file);
            setFiles(file);
        })
    }, [setFiles, setSrc])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
        <input {...getInputProps()} />
        <AiOutlineUpload size='huge'/>
    </div>
    )
}