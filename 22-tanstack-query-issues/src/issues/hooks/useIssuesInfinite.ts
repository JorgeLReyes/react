import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getIssues } from "../../helpers/getIssues";
import { State } from "../views/ListView";

interface Props {
  state: State;
  selectedLabels: string[];
}

export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabels }],
    queryFn: ({ pageParam, queryKey }) => {
      const { state, selectedLabels } = queryKey[2] as Props;
      return getIssues(state, selectedLabels, pageParam);
    },
    staleTime: 1000 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
  });

  return { issuesQuery };
};
