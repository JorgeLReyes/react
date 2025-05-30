import { githubApi } from "../api/github";
import { Issues } from "./getIssues";
import { sleep } from "./times";

export const getIssueComments = async (issueNumber: number) => {
  await sleep(1000);
  const { data } = await githubApi.get<Issues[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};
