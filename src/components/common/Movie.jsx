import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useWishlistStore } from "../../stores/wishlistStore";
import { CgSpinner } from "react-icons/cg";
import { GoHeartFill } from "react-icons/go";

const Movie = ({ date, rating, img, title, handleDelete, id }) => {
  const { addToWishlist, moviesId } = useWishlistStore();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const inWishlist = moviesId.includes(id);

  const handleDeleteMovie = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteLoading(true);
    try {
      await handleDelete(id);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddMovie = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      setAddLoading(true);
      await addToWishlist(id);
    } catch (error) {
      console.log(error);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="max-w-sm rounded-lg mx-auto md:mx-0 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <img
        className={`w-full h-64 object-cover transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        src={img}
        alt={title}
        onLoad={() => setIsLoading(false)}
      />
      <div className="p-4 bg-gray-800 text-white">
        <p className="text-[22px] font-medium mb-2 truncate">{title}</p>
        <p className="text-gray-400 text-sm mb-2">{date}</p>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-2">⭐ {rating}</span>
        </div>
        {location.pathname.startsWith("/wishlist") && (
          <button
            onClick={handleDeleteMovie}
            className="flex mt-2 cursor-pointer min-w-[60px] items-center justify-center py-2 px-4 text-sm font-medium text-white bg-red-500 rounded-lg border border-red-500 hover:bg-red-500 hover:border-red-600 transition-all duration-300"
          >
            {deleteLoading ? <p>deleting...</p> : <p>delete</p>}
          </button>
        )}
        {!location.pathname.startsWith("/wishlist") && (
          <button
            onClick={handleAddMovie}
            disabled={addLoading}
            className="flex gap-2 mt-3 cursor-pointer min-w-[150px] items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-yellow-400 rounded-lg border border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 transition-all duration-300"
          >
            {inWishlist ? <GoHeartFill size={20} color="red" /> : <GoHeartFill size={20} />}
            {!inWishlist ? (
              addLoading ? (
                <CgSpinner size={20} className="animate-spin" />
              ) : (
                "Add to favorites"
              )
            ) : (
              <p>in your wishlist</p>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Movie;
