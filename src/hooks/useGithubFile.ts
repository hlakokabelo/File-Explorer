import { useQuery } from "@tanstack/react-query";
import { getGithubFile } from "../services/githubService";

export function useGithubFile(repo: string, path?: string) {
  return useQuery({
    queryKey: ["github-file", repo, path],
    queryFn: () => getGithubFile(repo, path!),
    enabled: !!path,
  });
}
