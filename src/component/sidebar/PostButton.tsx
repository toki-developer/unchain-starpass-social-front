"use client";

// import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { abi, contractAddress } from "src/utils/contract/const";
import { useContractWrite, useWaitForTransaction } from "wagmi";

import { useModal } from "../modal/Modal";

export const PostButton = () => {
  const { Modal, handleClose, handleOpen } = useModal();

  return (
    <>
      <button
        className="bg-violet-9 hover:bg-violet-10 px-8 py-2 rounded-[10px] text-lg"
        onClick={handleOpen}
      >
        投稿する
      </button>
      <Modal>
        <PostForm onClose={handleClose} />
      </Modal>
    </>
  );
};

const PostForm = ({ onClose }: { onClose: () => void }) => {
  const [value, setValue] = useState<string>("");
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const sort = searchParams.get("sort") ?? 2;

  const { data, isLoading, write } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "post",
    mode: "recklesslyUnprepared",
  });

  const { isLoading: isTxLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async (tx) => {
      if (tx.status == 1) {
        //todo: refetchしたい
        window.location.reload();
        onClose();
      }
    },
  });

  const handleClick = () => {
    if (write) {
      write({ recklesslySetUnpreparedArgs: [value] });
    }
  };

  if (isLoading) {
    return <div>トランザクション送信中</div>;
  }

  if (isTxLoading) {
    return <div>データ書き込み中</div>;
  }

  if (isSuccess) {
    return <div>投稿が完了しました</div>;
  }

  return (
    <div>
      <textarea
        value={value}
        onChange={(v) => setValue(v.currentTarget.value)}
        className="bg-violet-3 w-full resize-none px-2"
        rows={3}
        placeholder="messageを入力してください"
      />
      <div className="mt-4 text-right">
        <button
          onClick={onClose}
          className="rounded-[10px] border border-violet-10 px-4 py-2 hover:border-violet-11 hover:bg-violet-4 hover:text-violet-11"
        >
          閉じる
        </button>
        <button
          className="rounded-[10px] border border-violet-10 bg-violet-9 px-8 py-2 ml-4 hover:bg-violet-10"
          onClick={handleClick}
        >
          投稿
        </button>
      </div>
    </div>
  );
};
