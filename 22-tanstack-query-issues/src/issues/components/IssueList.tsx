import { Issues } from "../../helpers/getIssues";
import { State } from "../views/ListView";
import { IssueItem } from "./IssueItem";

interface Props {
  issues: Issues[];
  state: State;
  onStateChange: (state: State) => void;
}

export const IssueList = ({ issues, onStateChange, state }: Props) => {
  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4">
        <button
          onClick={() => onStateChange("all")}
          className={`btn ${state === "all" && "active"} `}
        >
          All
        </button>
        <button
          onClick={() => onStateChange("open")}
          className={`btn ${state === "open" && "active"} `}
        >
          Open
        </button>
        <button
          onClick={() => onStateChange("closed")}
          className={`btn ${state === "closed" && "active"} `}
        >
          Closed
        </button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  );
};
