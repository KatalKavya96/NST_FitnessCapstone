import React, { useEffect, useState } from "react";
import { useAuth } from "../src/components/AuthContext";
import axios from "./apis/axiosInstance";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatarUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`/users/${user.uid}`)
        .then((res) => {
          const { name, bio, avatarUrl } = res.data;
          setFormData({
            name: name || "",
            bio: bio || "",
            avatarUrl: avatarUrl || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load profile data", err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
  
    console.log("📤 Submitting form with:", formData); // ✅ Add this
  
    try {
      await axios.put(`/users/${user.uid}`, formData);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile.");
    }
  };

  if (!user || loading) {
    return <p className="text-center mt-10 text-gray-600">Loading profile editor...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us something about you..."
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Avatar URL</label>
            <input
              type="url"
              name="avatarUrl"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder="https://i.pravatar.cc/100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
