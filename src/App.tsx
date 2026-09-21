import { useState } from "react";
import { PanelLeftOpen } from "lucide-react";
import FileViewer from "./components/FileViewer";
import { FileExplorer } from "./pages/FileExplorer";

function App() {
  const [explorerOpen, setExplorerOpen] = useState(true);

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* Mobile backdrop */}
      {explorerOpen && (
        <button
          type="button"
          aria-label="Close explorer"
          onClick={() => setExplorerOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] md:hidden"
        />
      )}

      <FileExplorer
        isOpen={explorerOpen}
        onClose={() => setExplorerOpen(false)}
      />

      {/* Main content */}
      <main className="relative min-w-0 flex-1 overflow-hidden p-2 sm:p-3 md:p-5 lg:p-6">
        {!explorerOpen && (
          <button
            type="button"
            onClick={() => setExplorerOpen(true)}
            aria-label="Open explorer"
            className="
      absolute left-0 top-1/2 z-20
      flex h-16 w-5 -translate-y-1/2
      items-center justify-center
      rounded-r-lg
      cursor-pointer
      border border-l-0 border-green-500
      bg-white
      text-green-500
      shadow-sm
      transition
      hover:w-7
      hover:bg-green-50
      hover:text-green-700
    "
          >
            <PanelLeftOpen size={16} />
          </button>
        )}
        <FileViewer />
      </main>
    </div>
  );
}

export default App;
