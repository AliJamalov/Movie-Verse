import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { formatDate } from "../../utils/formatDate";
import { axiosInstance } from "../../utils/axios";
import { FaTrash } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

const Comments = ({ comments, showComments, setShowComments, loading, fetchComments, commentOwner }) => {
  const [deleteLoading, setDeleteLoading] = useState({});

  const handleDeleteComment = async (id) => {
    setDeleteLoading((prevState) => ({ ...prevState, [id]: true }));
    try {
      await axiosInstance.delete(`/comments/${id}`);
      fetchComments();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading((prevState) => ({ ...prevState, [id]: false }));
    }
  };
  return (
    <div className="md:px-[100px] mt-7 text-white">
      <button
        className="bg-yellow-400 flex items-center justify-center cursor-pointer text-black font-medium py-2 px-4 rounded-lg transition hover:bg-yellow-500 active:bg-yellow-600"
        onClick={() => setShowComments(!showComments)}
      >
        Show comments
      </button>
      {loading && <p className="text-center">loading...</p>}
      <div className={`${showComments ? "block" : "hidden"}`}>
        {comments.length > 0 ? (
          comments?.map((comment) => (
            <div key={comment._id} className="relative flex items-start gap-4 my-5 border-b pb-4">
              <FaRegCircleUser color="white" size={25} />
              <div className="flex flex-col">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <p>{comment?.userId?.fullName}</p>
                  <p className="text-gray-400">{formatDate(comment?.createdAt)}</p>
                </div>
                <p className="text-gray-300 mt-2">{comment?.text}</p>
              </div>
              {commentOwner && (
                <div>
                  {deleteLoading[comment._id] ? (
                    <CgSpinner className="absolute right-4 top-4 animate-spin" />
                  ) : (
                    <FaTrash
                      onClick={() => handleDeleteComment(comment._id)}
                      className="absolute right-4 top-4 cursor-pointer text-red-600"
                    />
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="mt-3 text-center text-gray-500 italic">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
