export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const abi = [
  {
    inputs: [],
    name: "getLastPostId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_postId",
        type: "uint256",
      },
    ],
    name: "getPost",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "postId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "author",
            type: "address",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalLikes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct ISocialNetwork.PostDetail",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "order",
        type: "uint256",
      },
    ],
    name: "getPosts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "postId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "author",
            type: "address",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalLikes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
        ],
        internalType: "struct ISocialNetwork.PostDetail[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_postId",
        type: "uint256",
      },
    ],
    name: "like",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "post",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_postId",
        type: "uint256",
      },
    ],
    name: "unlike",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
