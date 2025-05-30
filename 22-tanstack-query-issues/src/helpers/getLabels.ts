import { githubApi } from "../api/github";
import { sleep } from "./times";

interface GithubLabel {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export const getLabels = async () => {
  await sleep(1500);
  const { data } = await githubApi.get<GithubLabel[]>("/labels");
  return data;
};
