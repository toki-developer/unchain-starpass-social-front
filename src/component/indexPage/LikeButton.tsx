import type { BigNumber } from "ethers";
import { useState } from "react";
import { abi, contractAddress, LIKED, NO_LIKED } from "src/utils/contract/const";
import { useContractWrite, useTransaction } from "wagmi";

type Props = {
  postId: BigNumber;
  isLike: number;
  totalLikes: number;
};

export const LikeButton = ({
  isLike: isLikeProps,
  postId,
  totalLikes: totalLikesProps,
}: Props) => {
  const [isLike, setIsLike] = useState(isLikeProps);
  const [totalLikes, setTotalLikes] = useState(totalLikesProps);

  const {isLikeLoading, like} = useLike({postId, onSuccess: () => {
    setIsLike(LIKED);
    setTotalLikes((v) => v + 1);
  }})

  const {isUnlikeLoading, unlike} = useUnlike({postId, onSuccess: () => {
    setIsLike(NO_LIKED);
    setTotalLikes((v) => v - 1);
  }})



  const handleClick = () => {
    //TODO: loading中は押せないように
    if(isLike == LIKED) {
        if (unlike) {
            unlike();
          }
    }else {
        if (like) {
            like();
          }
    }
  };

  if (isLikeLoading || isUnlikeLoading) {
    //TODO: loading
    return <div></div>;
  }

  return (
    <button className="flex" onClick={handleClick}>
      <span className={`${isLike == LIKED && " text-crimson-10"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={`${isLike == LIKED ? "currentColor" : "none"}`}
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
      {totalLikes}
    </button>
  );
};

type HooksProps = {
    postId: BigNumber
    onSuccess: () => void
}

const useLike = ({onSuccess, postId}: HooksProps) => {
    const { data, isLoading, write: like } = useContractWrite({
        address: contractAddress,
        abi: abi,
        functionName: "like",
        args: [postId],
        mode: "recklesslyUnprepared",
      });

      const { isLoading: isTxLoading } = useTransaction({
        hash: data?.hash,
        onSuccess: async (tx) => {
          tx.wait().then((v) => {
            if (v.status == 1) {
              //TODO: 再フェッチ
              onSuccess();
            }
          });
        },
      });

    return {like, isLikeLoading: isLoading || isTxLoading }
}

const useUnlike = ({onSuccess, postId}: HooksProps) => {
    const { data, isLoading, write: unlike } = useContractWrite({
        address: contractAddress,
        abi: abi,
        functionName: "unlike",
        args: [postId],
        mode: "recklesslyUnprepared",
      });

      const { isLoading: isTxLoading } = useTransaction({
        hash: data?.hash,
        onSuccess: async (tx) => {
          tx.wait().then((v) => {
            if (v.status == 1) {
              //TODO: 再フェッチ
              onSuccess();
            }
          });
        },
      });

    return {unlike, isUnlikeLoading: isLoading || isTxLoading }
}