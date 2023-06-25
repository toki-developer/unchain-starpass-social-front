"use client";

import { abi, contractAddress } from "src/utils/contract/const";
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
          <article key={post.postId.toString()}>
            <p>{post.message}</p>
            <p>{post.author}</p>
            <p>{post.time.toString()}</p>
            <p>{post.totalLikes.toString()}</p>
          </article>
        );
      })}
    </div>
  );
};

//TODO:UIの修正
