"use client";

import { abi, contractAddress } from "src/utils/contract/const";
import { addressShortStr } from "src/utils/string/addressShortStr";
import { useContractRead } from "wagmi";

import { LikeButton } from "./LikeButton";

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
              <LikeButton
                isLike={post.isLike.toNumber()}
                totalLikes={post.totalLikes.toNumber()}
              />
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
