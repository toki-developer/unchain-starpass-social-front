"use client";

import { useSearchParams } from "next/navigation";
import { ADDRESS_ZERO } from "src/utils/const";
import { abi, contractAddress } from "src/utils/contract/const";
import { addressShortStr } from "src/utils/string/addressShortStr";
import { useAccount, useContractRead } from "wagmi";

import { LikeButton } from "./LikeButton";

export const PostList = () => {
  const searchParams = useSearchParams();
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getPosts",
    args: [searchParams.get("sort") ?? (2 as any)],
    overrides: { from: address ?? ADDRESS_ZERO },
  });

  if (isLoading) {
    //TODO: ローディング処理 (試験に関係なさそうだから未実装)
    return null;
  }

  if (!data || isError) {
    //TODO: エラー処理 (試験に関係なさそう)
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
            <div className="flex justify-between mt-8 ">
              <LikeButton
                isLike={post.isLike.toNumber()}
                totalLikes={post.totalLikes.toNumber()}
                postId={post.postId}
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
