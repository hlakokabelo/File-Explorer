import { useState } from "react";
import { FileItem } from "../components/FileItem";
import { useFileStore } from "../store/file";
import { buildTree } from "../utils/buildTree";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const fileModules = import.meta.glob<string>("/src/data/**/*", {
  query: "?raw",
  import: "default",
});

const fileTree = buildTree(Object.keys(fileModules));
useFileStore.setState({ fileModules });

export function FileExplorer() {
  const [isOpen, setIsOpen] = useState(true);

  // Collapsed: render only a slim rail with a "show" button
  if (!isOpen) {
    return (
      <div className="flex h-full w-10 shrink-0 flex-col items-center border-r border-slate-200 bg-white pt-3">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Show explorer"
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <PanelLeftOpen size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Header row with hide button */}
      <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Explorer
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Hide explorer"
          className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <PanelLeftClose size={16} />
        </button>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto p-2">
        {fileTree.map((item) => (
          <FileItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
