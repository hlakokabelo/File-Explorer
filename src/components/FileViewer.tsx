import { useEffect, useState } from "react";
import { useFileStore } from "../store/file";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Loading } from "./Loading";

export default function FileViewer() {
  const [content, setContent] = useState("");

  const fileModules = useFileStore((state: any) => state.fileModules);
  const imageModules = useFileStore((state: any) => state.imageModules);
  const filePath = useFileStore((state: any) => state.filePath);
  const setFilePath = useFileStore((state: any) => state.setFilePath); // 👈 assumed setter
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // Load file content whenever filePath changes
  useEffect(() => {
    if (!filePath) return;

    setIsLoading(true);

    if (isImage) {
      const url = imageModules[filePath];
      if (url) {
        setImageUrl(url);
      }
    } else {
      const text = fileModules[filePath];

      if (text) {
        setContent(text);
      }
    }

    setIsLoading(false);
  }, [filePath, fileModules, imageModules, extension]);

  if (!filePath) return null;

  const handleClose = () => {
    setFilePath(""); // Clear the file path to close the viewer
  };

  return (
    <div className="h-full relative w-full">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {/* Close button — top-right corner */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close file"
            className="cursor-pointer absolute right-3 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:bg-red-500 hover:text-slate-800 hover:shadow"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
          <h1 className=" rounded-2xl overflow-auto border bg-amber-50 p-3 pr-12 font-semibold ">
            <span className="text-slate-600">{cleanPath}</span>
            <span className="text-slate-900 font-semibold">{fileName}</span>
          </h1>
          <div className="h-16/17 border mt-2 p-2 pl-3 rounded-2xl bg-white overflow-auto">
            {extension === "md" && (
              <div className="prose max-w-none p-6">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}

            {isCode && (
              <SyntaxHighlighter language={extension}>
                {content}
              </SyntaxHighlighter>
            )}

            {isImage && (
              <div className="flex h-full items-center justify-center">
                <img
                  src={imageUrl}
                  alt={cleanPath}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}

            {isOther && (
              <div className="prose w-fit">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
