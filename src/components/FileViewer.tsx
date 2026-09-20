import { useEffect, useState } from "react";
import { useFileStore } from "../store/file";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface IFileViewerProps {}

export default function FileViewer(props: IFileViewerProps) {
  const [content, setContent] = useState("");

  const fileModules = useFileStore((state: any) => state.fileModules);
  const filePath = useFileStore((state: any) => state.filePath);
  const setFilePath = useFileStore((state: any) => state.setFilePath); // 👈 assumed setter

  // Load file content whenever filePath changes
  useEffect(() => {
    if (!filePath) return;
    let cancelled = false;

    (async () => {
      const loader = fileModules[filePath];
      if (!loader) return;
      const text = await loader();
      if (!cancelled) setContent(text as string);
    })();

    return () => {
      cancelled = true;
    };
  }, [filePath, fileModules]);

  if (!filePath) return null;

  const extension = filePath.split(".").pop();
  const isImage = ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(
    extension ?? "",
  );
  const isCode = ["ts", "tsx", "css", "js", "jsx", "json"].includes(
    extension ?? "",
  );
  const isOther = extension.includes("/"); // has no extention

  const handleClose = () => {};

  return (
    <div className="h-full relative w-full">
      {/* Close button — top-right corner */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close file"
        className="cursor-pointer absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:bg-red-500 hover:text-slate-800 hover:shadow"
      >
        <X size={16} strokeWidth={2.5} />
      </button>

      <div className="h-full  overflow-auto">
        {extension === "md" && (
          <div className="prose">
            <Markdown>{content}</Markdown>
          </div>
        )}

        {isCode && (
          <SyntaxHighlighter language={extension}>{content}</SyntaxHighlighter>
        )}

        {isImage && (
          <div className="flex h-full items-center justify-center">
            <img src={filePath} alt={filePath} className="h-fit w-fit" />
          </div>
        )}

        {isOther && (
          <div className="prose">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
