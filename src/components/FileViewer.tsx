import { useEffect, useState } from "react";
import { useFileStore } from "../store/file";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function FileViewer() {
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
  const fileName = filePath.split("/").pop();
  const cleanPath = filePath.replace("/data", "").replace(fileName ?? "", "");

  const isImage = ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(
    extension ?? "",
  );
  const isCode = ["ts", "tsx", "css", "js", "jsx", "json"].includes(
    extension ?? "",
  );
  const isOther = extension.includes("/"); // has no extention

  const handleClose = () => {
    setFilePath(""); // Clear the file path to close the viewer
  };

  return (
    <div className="h-full relative w-full">
      {/* Close button — top-right corner */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close file"
        className="cursor-pointer absolute right-3 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:bg-red-500 hover:text-slate-800 hover:shadow"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
      <h1 className=" rounded-2xl overflow-auto border bg-amber-50 p-3 pr-1.5 font-semibold ">
        {cleanPath}
        <span className="text-red-500">{fileName}</span>
      </h1>
      <div className="h-16/17 border mt-2 p-2 pl-3 rounded-2xl bg-white overflow-auto">
        {extension === "md" && (
          <div className="prose max-w-none p-6">
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
          <div className="prose w-fit">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
