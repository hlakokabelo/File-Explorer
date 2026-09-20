import { File, FileJson, FileText, FileImage, FileCode2 } from "lucide-react";
import { BsFiletypeTsx } from "react-icons/bs";
import { TbBrandTypescript } from "react-icons/tb";

export function getFileIcon(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "json":
      return <FileJson size={16} />;

    case "md":
    case "txt":
      return <FileText size={16} />;

    case "ts":
      return <TbBrandTypescript size={16} />;
    case "tsx":
      return <BsFiletypeTsx size={16} />;
    case "js":
    case "jsx":
      return <FileCode2 size={16} />;

    case "png":
    case "jpg":
    case "jpeg":
      return <FileImage size={16} />;

    default:
      return <File size={16} />;
  }
}
