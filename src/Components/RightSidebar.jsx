import React from "react";

const onlineFriends = ["Stark Hound", "Elenor Smith", "Antony Teased"];
// This component do not show right now 
const RightBar = () => {
  return (
    <div className="hidden lg:flex lg:flex-col md:flex md:flex-col xl:block w-60 bg-base-100 shadow-xl p-6 sticky top-20 h-fit">
      <h2 className="text-xl font-bold mb-6">Online Friends</h2>
      <div className="space-y-4">
        {onlineFriends.map((friend, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src="https://i.pravatar.cc/300" alt={friend} />
              </div>
            </div>
            <span className="font-medium">{friend}</span>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Suggestions</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://i.pravatar.cc/300?img=5" alt="Suggested" />
              </div>
            </div>
            <div>
              <p className="font-medium">Julia Rose</p>
              <p className="text-sm opacity-70">Suggested for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
