export async function getRepoContents(repo: string, path = "") {
  const res = await fetch(
    `https://api.github.com/repos/hlakokabelo/${repo}/contents/${path}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repository contents");
  }

  return res.json();
}

export async function getGithubFile(repo: string, path: string) {
  const res = await fetch(
    `https://api.github.com/repos/hlakokabelo/${repo}/contents/${path}`,
    {
      headers: {
        Accept: "application/vnd.github.raw+json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch file");
  }

  return res.text();
}
