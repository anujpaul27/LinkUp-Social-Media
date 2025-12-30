import Feed from "./Feed";
import RightBar from "./RightSidebar";

const Feed_RightBar = () => {
  return (
    <div className="flex flex-1">
      <Feed></Feed>
      <RightBar></RightBar>
    </div>
  );
};

export default Feed_RightBar;
