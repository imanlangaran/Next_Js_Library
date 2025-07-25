'use client';

import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed ${error.message}`);
  }
}

const { env: { imagekit: { publicKey, urlEndpoint } } } = config;

interface Props {
  type: "image" | "video",
  accept: string,
  placeholder: string,
  folder: string,
  variant: "dark" | "light",
  onFileChange: (FilePath: string) => void,
  value?: string
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value
}: Props) => {

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | "" }>({ filePath: value ?? "" });
  const [progress, setProgress] = useState(0);
  const style = {
    botton: variant === "dark" ? "bg-dark-300" : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-dark-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  }

  const onError = (error: any) => {
    console.log(error)
    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. please try again.`, variant: "destructive"
    })
  }
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${type} uploaded successfully`,
    })
  }
  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 20MB in size",
          variant: "destructive"
        })
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file that is less than 50MB in size",
          variant: "destructive"
        })
        return false;
      }
    }
    return true;
  }

  return <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
    <IKUpload
      className="hidden" ref={ikUploadRef} onError={onError} onSuccess={onSuccess}
      useUniqueFileName={true}
      validateFile={onValidate}
      onUploadStart={() => setProgress(0)}
      onUploadProgress={({ loaded, total }) => {
        const persent = Math.round(loaded / total * 100);
        setProgress(persent);
      }}
      folder={folder}
      accept={accept}
    />

    <button className={cn('upload-btn', style.botton)} onClick={(e) => {
      e.preventDefault();

      if (ikUploadRef.current) {
        // @ts-ignore
        ikUploadRef.current?.click();
      }
    }}>
      <Image src='/icons/upload.svg'
        alt="upload-icon"
        width={20}
        height={20}
        className="object-contain" />

      <p className={cn("text-base", style.text)}>{placeholder} </p>

      {file && <p className={cn("upload-filename", style.text)}>{file.filePath}</p>}

    </button>

    {progress > 0 && progress != 100 && (
      <div className="w-full rounded-full bg-green-200">
        <div className="progress" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>
    )}

    {file &&
      (type === 'image' ? (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      ) : type === 'video' ? (
        <IKVideo
          path={file.filePath}
          controls={true}
          className="h-96 w-full rounded-xl"
        />
      ) : null)}
  </ImageKitProvider>
}

export default FileUpload