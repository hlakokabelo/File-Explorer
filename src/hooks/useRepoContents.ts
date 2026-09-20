import { useQuery } from "@tanstack/react-query";
import { getRepoContents } from "../services/githubService";

export function useRepoContents(repo: string, path = "") {
  return useQuery({
    queryKey: ["repo-contents", repo, path],
    queryFn: () => getRepoContents(repo, path),
  });
}
