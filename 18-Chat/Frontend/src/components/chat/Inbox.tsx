import { SearchBox } from "./SearchBox";
import { Sidebar } from "./Sidebar";

export const Inbox = () => {
  return (
    <div className="inbox_people">
      <SearchBox />
      <Sidebar />
    </div>
  );
};
