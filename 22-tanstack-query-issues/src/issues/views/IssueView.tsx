import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { FiSkipBack } from "react-icons/fi";
import { useIssue } from "../hooks/useIssue";
import LoadingSpiner from "../../shared/components/LoadingSpiner";

export const IssueView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { issueQuery, commentsQuery } = useIssue(Number(id));

  if (issueQuery.isLoading) return <LoadingSpiner />;

  if (!Object.keys(issueQuery.data || {}).length) return <Navigate to="/404" />;

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data!} />

      {commentsQuery.isLoading ? (
        <LoadingSpiner />
      ) : (
        commentsQuery.data?.map((comment) => (
          <IssueComment key={comment.id} issue={comment} />
        ))
      )}

      {/* Comentario de otros */}
      {/* <IssueComment body={comment2} /> */}
      {/* <IssueComment body={comment3} /> */}
    </div>
  );
};
