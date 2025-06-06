import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks/useIssues";
import LoadingSpiner from "../../shared/components/LoadingSpiner";
import { useState } from "react";

export type State = "open" | "closed" | "all";

export const ListView = () => {
  const [state, setState] = useState<State>("all");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { issuesQuery, page, nextPage, previousPage } = useIssues({
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
          <>
            <IssueList
              issues={issuesQuery.data || []}
              onStateChange={setState}
              state={state}
            />
            <div className="flex justify-between items-center">
              <button
                onClick={previousPage}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
              >
                Anteriores
              </button>
              <span>{page}</span>
              <button
                onClick={nextPage}
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
              >
                Siguientes
              </button>
            </div>
          </>
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
