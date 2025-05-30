import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import LoadingSpiner from "../../shared/components/LoadingSpiner";
import { useState } from "react";
import { useIssuesInfinite } from "../hooks/useIssuesInfinite";

export type State = "open" | "closed" | "all";

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>("all");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery } = useIssuesInfinite({
    state,
    selectedLabels,
  });

  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpiner />
        ) : (
          <div className="flex flex-col justify-center">
            <IssueList
              issues={issuesQuery.data?.pages.flat() || []}
              onStateChange={setState}
              state={state}
            />
            <button
              onClick={() => issuesQuery.fetchNextPage()}
              disabled={issuesQuery.isFetchingNextPage}
              className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:bg-gray-500"
            >
              {issuesQuery.isFetchingNextPage ? (
                <LoadingSpiner />
              ) : (
                "Cargar mas"
              )}
            </button>
          </div>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          onSelectedLabel={onLabelSelected}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
