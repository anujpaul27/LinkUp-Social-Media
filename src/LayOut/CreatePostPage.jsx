import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../Context/ContextProvider";
import axios from "axios";

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { DBUser } = useContext(UserContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const UploadImage = async () => {
    if (!selectedImage) return "";
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload/posts`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      // if response is link return this link otherwise return string
      return res.data?.url || "";
    } catch (error) {
      console.error("Image upload failed:", error);
      return "";
    }
  };

  const PostUploadToDataBase = async (imageLink = "") => {
    // Post sent to the database
    const createPost = {
      uid: DBUser?.uid,
      userName: DBUser?.name,
      userPhoto: DBUser?.photoURL,
      postText,
      imageLink,
      like: [],
      createAt: new Date().toDateString(),
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/post`, createPost);
      console.log("Post sent successful:", res.data);
      return res.data; // return response for further use
    } catch (error) {
      console.error("Create post unsuccessful:", error);
      return null; // return null if failed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim() && !selectedImage) return;
    setIsSubmitting(true);

    const imageLink = await UploadImage();
    PostUploadToDataBase(imageLink);

    // API call
    setTimeout(() => {
      setIsSubmitting(false);
      setPostText("");
      setSelectedImage(null);
      setPreviewImage(null);
      alert("Your Post is Successful!.");
    }, 1000);
  };

  return (
    <div className={`max-w-2xl  my-6 px-4 ${isSubmitting ? "loading" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 shadow-xl rounded-xl overflow-hidden border border-base-400"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-base-200 flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2">
              <img src={DBUser?.photoURL} alt="Your profile" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold">{DBUser?.name}</h3>
            <p className="text-xs text-base-content/60">Public post</p>
          </div>
        </div>

        {/* Post Input Area */}
        <div className="p-5">
          <textarea
            className="textarea textarea-ghost w-full min-h-[120px] text-lg placeholder-base-content/50 focus:outline-none resize-none bg-transparent"
            placeholder="What's on your mind?."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows={4}
          />

          {/* Image Preview */}
          {previewImage && (
            <div className="relative mt-4 rounded-xl overflow-hidden border border-base-300">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full max-h-96 object-contain bg-black/5"
              />
              <button
                onClick={() => {
                  setPreviewImage(null);
                  setSelectedImage(null);
                }}
                className="btn btn-circle btn-error btn-sm absolute top-2 right-2"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-5 py-3 border-t border-base-200 flex items-center justify-between bg-base-200/50">
          {/* Attachment Options */}
          <div className="flex gap-4">
            <label className="cursor-pointer hover:bg-base-300 p-2 rounded-lg transition">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <p className="text-sm lg:text-lg md:text-lg">
                <span>📷</span> Photo/Video
              </p>
            </label>
          </div>

          {/* Post Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (!postText.trim() && !previewImage)}
            className={`btn btn-primary px-8 rounded-full lg:min-w-[120px] md:min-w-[120px]`}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreatePost;
