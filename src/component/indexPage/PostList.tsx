"use client";

import { abi, contractAddress, LIKED } from "src/utils/contract/const";
import { addressShortStr } from "src/utils/string/addressShortStr";
import { useContractRead } from "wagmi";

export const PostList = () => {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getPosts",
    args: [1 as any],
  });

  if (isLoading) {
    return null;
  }

  if (!data || isError) {
    return null;
  }

  return (
    <div>
      {data.map((post) => {
        return (
          <article
            key={post.postId.toString()}
            className="border-b border-violet-6 p-4 group"
          >
            <p className="flex items-center gap-2">
              <span className="h-10 w-10 rounded-full bg-mauve-9 block" />
              <span className="group-hover:hidden">
                {addressShortStr(post.author, 5)}
              </span>
              <span className="hidden group-hover:block">{post.author}</span>
            </p>
            <p className="mt-2 ml-12">{post.message}</p>
            <div className="flex justify-between mt-8">
              <button className="flex">
                <span
                  className={`${
                    post.isLike.toNumber() == LIKED ? " text-crimson-10" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={`${
                      post.isLike.toNumber() == LIKED ? "currentColor" : "none"
                    }`}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </span>
                {post.totalLikes.toString()}
              </button>
              <p className="text-mauve-11">
                {new Date(post.time.toNumber() * 1000).toUTCString()}
              </p>
              {/* {post.time.toString()} */}
            </div>
          </article>
        );
      })}
    </div>
  );
};

//TODO:UIの修正
