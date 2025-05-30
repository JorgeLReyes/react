import { githubApi } from "../api/github";
import { State } from "../issues/views/ListView";
import { sleep } from "./times";
export interface Issues {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: { name: string; id: string; color: string }[];
  state: string;
  locked: boolean;
  assignee: null;
  assignees: string[];
  milestone: null;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at: null;
  author_association: string;
  type: null;
  active_lock_reason: null;
  draft: boolean;
  pull_request: PullRequest;
  body: string;
  closed_by: null;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
}

interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: null;
}

interface Reactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export const getIssues = async (
  state: State,
  selectedLabels: string[],
  page: number
) => {
  await sleep(1000);

  const params = new URLSearchParams();

  if (state !== "all") params.append("state", state);
  if (selectedLabels.length) params.append("labels", selectedLabels.join(","));

  params.append("page", `${page}`);
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issues[]>("/issues", {
    params,
  });
  return data;
};
