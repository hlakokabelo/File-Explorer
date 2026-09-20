export type FileNode = {
  name: string;
  type: "file" | "folder" | "dir";
  children?: FileNode[];
  repo?: string;
  path?: string;
};
