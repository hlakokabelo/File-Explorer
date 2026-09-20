import { useState } from "react";
import type { FileNode } from "../types/file";
import { getFileIcon } from "./getFileIcon";
import { useFileStore } from "../store/file";

export function FileItem({ item }: { item: FileNode }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (item.type === "folder") {
      return setOpen(!open);
    }

    useFileStore.setState({ filePath: item.path });
  };
  return (
    <div>
      <div
        onClick={handleClick}
        className="flex items-center cursor-pointer hover:bg-gray-200 p-1 rounded"
      >
        {item.type === "folder" ? (open ? "📂" : "📁") : getFileIcon(item.name)}

        {item.name}
      </div>

      {item.type === "folder" && open && (
        <div className="ml-5">
          {item.children?.map((child) => (
            <FileItem key={child.name} item={child} />
          ))}
        </div>
      )}
    </div>
  );
}
