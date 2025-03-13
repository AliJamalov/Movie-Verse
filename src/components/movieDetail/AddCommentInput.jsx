import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const AddCommentInput = ({ fetchComments, id }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateComment = async () => {
    setLoading(true);
    try {
      if (!comment.trim()) return;
      await axiosInstance.post("/comments", {
        text: comment,
        movieId: id,
      });
      setComment("");
      fetchComments();
      toast.success("Your comment has been added successfully.");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="mx-auto flex gap-3 md:mx-0 w-[full] md:w-[700px] md:px-[100px] text-white">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-yellow-500 p-2 outline-none rounded"
          type="text"
          placeholder="add your comment"
        />
        <button
          onClick={handleCreateComment}
          disabled={loading}
          className="bg-yellow-400 flex items-center justify-center cursor-pointer text-black font-medium py-2 px-4 rounded-lg transition hover:bg-yellow-500 active:bg-yellow-600"
        >
          {loading ? <CgSpinner size={20} className="animate-spin" /> : "add"}
        </button>
      </div>
    </div>
  );
};

export default AddCommentInput;
