import "./Loader.css";
export const Loader = ({ isRender }: { isRender: boolean }) => {
  if (!isRender) return null;
  return (
    <div className="three-body" aria-label="loader">
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
    </div>
  );
};
