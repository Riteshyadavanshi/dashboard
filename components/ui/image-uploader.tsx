import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Button } from "./button";

interface ImageUploaderProps {
  disabled?: boolean;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
  images: string[];
}
export const ImageUploader = ({
  disabled,
  onChange,
  onRemove,
  images,
}: ImageUploaderProps) => {
  const onUpload = (result: any) => {
    onChange(result?.info?.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col  gap-4">
        {images.map((url) => (
          <div
            key={url}
            className="relative  size-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant={"destructive"}
                type="button"
                onClick={() => onRemove(url)}
              >
                <Trash className="size-4" />
              </Button>
            </div>
            <Image src={url} alt="image" fill className="object-cover" />
          </div>
        ))}

        <div className="z-999">
          <CldUploadWidget onSuccess={onUpload} uploadPreset="dashboard">
            {({ open }) => {
              const onClick = () => {
                open();
              };
              return (
                <>
                  <Button
                    type="button"
                    disabled={disabled}
                    variant={"secondary"}
                    onClick={onClick}
                  >
                    <ImagePlus className="size-4 mr-2" />
                    Upload an Image
                  </Button>
                </>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>
    </div>
  );
};
