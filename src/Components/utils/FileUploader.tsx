import {useFileUpload} from "react-firebase-file-upload";
import  { storage } from "../../config/firebase-config.tsx";

interface FileUploaderProps {
    fileUrl: (url: string) => void;
}

export function FileUploader (fileUrl: FileUploaderProps) {

    const _input = useFileUpload(storage, {
        accept: 'image/*',
        multiple: false,
        path: `players`
    })

    const {
        type,
        accept,
        multiple,
        disabled,
        onChange,
        files,
        loading,
        error,
        progress,
        status,
        downloadURL,
        isCompleted,
        onUpload,
        onUploadComplete,
        onRemove,} = _input;
    return (
        <>
            <input
                type={type}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={onChange}
            />
            <div></div>
        </>
    )
}