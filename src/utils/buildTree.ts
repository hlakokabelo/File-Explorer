import type { FileNode } from "../types/file";

export function buildTree(paths: string[]): FileNode[] {
  const root: FileNode[] = [];

  for (const path of paths) {
    const cleanPath = path.replace("/data/", "");
    const parts = cleanPath.split("/");

    let current = root;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;

      let existing = current.find((item) => item.name === part);

      if (!existing) {
        existing = {
          name: part,
          path: path,
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : [],
        };

        current.push(existing);
      }

      if (!isFile) {
        current = existing.children!;
      }
    });
  }

  return root;
}
