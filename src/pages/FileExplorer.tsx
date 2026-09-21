import { FileItem } from "../components/FileItem";
import { useFileStore } from "../store/file";
import { buildTree } from "../utils/buildTree";
import { PanelLeftClose } from "lucide-react";

const fileModules = import.meta.glob<string>("/src/../data/**/*", {
  query: "?raw",
  import: "default",
  eager: true,
});

const imageModules = import.meta.glob<string>(
  "/src/../data/**/*.{png,jpg,jpeg,webp,gif,svg}",
  {
    query: "?url",
    import: "default",
    eager: true,
  },
);

const fileTree = buildTree(Object.keys(fileModules));

useFileStore.setState({
  fileModules,
  imageModules,
});

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function FileExplorer({ isOpen, onClose }: Props) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40
        flex w-[85vw] max-w-80 flex-col
        border-r border-slate-200 bg-white
        shadow-xl transition-transform duration-200

        md:static md:z-auto md:w-72 md:max-w-none
        md:shrink-0 md:shadow-none

        ${isOpen ? "translate-x-0" : "-translate-x-full md:hidden"}
      `}
    >
      {/* Header */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 px-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Explorer
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Hide explorer"
          className="flex
       h-8 w-8 cursor-pointer items-center justify-center rounded-md text-red-500 transition hover:bg-slate-100 hover:text-red-600"
        >
          <PanelLeftClose size={19} />
        </button>
      </div>

      {/* Files */}
      <div className="min-h-0 flex-1 overflow-auto p-2">
        <div className="min-w-max">
          {fileTree.map((item) => (
            <FileItem key={item.name} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
}
