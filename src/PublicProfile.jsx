import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicProfile = () => {
  const { uid } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${uid}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Profile load error:", err));
  }, [uid]);

  if (!profile) {
    return <p className="text-center mt-10 text-gray-600">Loading user profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
            <img
              className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
              src={profile.avatarUrl || "https://i.pravatar.cc/100"}
              alt="User avatar"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 px-6 pb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
          {profile.bio && (
            <p className="mt-2 text-gray-600 italic text-sm">"{profile.bio}"</p>
          )}

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-blue-600">{profile.totalPoints}</span>
              <span>Total Points</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-green-600">
                {profile.challengesCompleted?.length || 0}
              </span>
              <span>Challenges</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-purple-600">{profile.streak || 0}</span>
              <span>Streak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
