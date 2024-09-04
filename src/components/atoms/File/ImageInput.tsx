import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UIProps } from "../../UIProps";
import Button from "../Button/Button";
import { Icon20 } from "../Icon/Icon20";
import { Icon40 } from "../Icon/Icon40";
import { Label } from "../Label/Label";

// File Upload
export const UPLOAD_FILE_SIZE_LIMIT = 10 * 1024 * 1024;

export interface ImageInputProps extends Omit<UIProps.Input, "onChange"> {
  value?: string;
  label?: React.ReactNode;
  error?: Error;
  onChange: (value: string) => void;
}

export const ImageInput = ({ value, label, error, onChange, className, ...props }: ImageInputProps) => {
  const inputId = "image_input";
  const [dragging, setDragging] = useState(false);
  const [shortenedName, setShortenedName] = useState<string>("");

  const uploadFile = useCallback(
    async (file?: File) => {
      if (!file || file.size > UPLOAD_FILE_SIZE_LIMIT) {
        return;
      }

      const fileName = `${uuidv4()}_${file.name}`;
      setShortenedName(file.name.length > 30 ? `${file.name.slice(0, 30)}...` : file.name);

      const newFile = new File([file], fileName, { type: file.type });

      try {
        const { data } = await axios.post("/api/media-upload", {
          fileName: newFile.name,
          fileType: newFile.type,
        });
        const { url } = data;
        await axios.put(url as string, newFile, {
          headers: {
            "Content-Type": newFile.type,
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch (error) {
        console.error(error);
      }
      const newMediaUrl = `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/${fileName}`;
      onChange(newMediaUrl);
    },
    [onChange],
  );

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    uploadFile(file);
  };

  return (
    <div className="flex flex-col items-start gap-3 self-stretch">
      {!!label && <Label htmlFor={inputId} label={label} error={error} required />}
      {!value ? (
        <div
          className={clsx(
            "flex w-full flex-col items-center justify-center gap-2.5 rounded-md px-5 py-6",
            dragging ? "border border-blue-600 bg-blue-100" : "border border-gray-200 bg-gray-100",
          )}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={(e) => uploadFile(e.target.files?.[0])}
            multiple={false}
            className={clsx("hidden", className)}
            {...props}
          />
          <div className="flex flex-col items-center justify-center gap-3">
            <Icon40.FileUpload />
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-16/body/l text-gray-950">Drop your file here, or browse</p>
              <p className="text-14/body/m text-blue-600">Please upload a PNG or JPG file under 4MB.</p>
            </div>
            <Button onClick={() => document.getElementById(inputId)?.click()}>Browse</Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center gap-2.5 rounded-md border border-gray-200 bg-gray-100 px-5 py-4">
          <div className="flex flex-1 items-center gap-4">
            <Image src={value} alt={value} width={32} height={32} />
            <p className="text-16/body/l/emp text-gray-950">{shortenedName}</p>
          </div>
          <button type="button" className="p-1" onClick={() => onChange("")}>
            <Icon20.Close />
          </button>
        </div>
      )}
    </div>
  );
};
