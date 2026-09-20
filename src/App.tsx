import FileViewer from "./components/FileViewer";
import { FileExplorer } from "./pages/FileExplorer";

function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* Sidebar */}
      <FileExplorer />

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        <FileViewer />
      </main>
    </div>
  );
}

export default App;
