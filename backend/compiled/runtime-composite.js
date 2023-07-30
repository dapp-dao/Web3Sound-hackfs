// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    User: {
      id: "kjzl6hvfrbw6caeox7aondvgjzw06k3itg51oqpxvgzvsydzurl0uowr1j8qoiu",
      accountRelation: { type: "single" },
    },
    Audio: {
      id: "kjzl6hvfrbw6c50tlukwnjvr4dekfh1wdttx3za0uedgjp804o3dt6xknf2vq5c",
      accountRelation: { type: "list" },
    },
    Follow: {
      id: "kjzl6hvfrbw6c807tjavpq7yz34f793d1xtz8i8uyfbzlachikkauk65hc71h5j",
      accountRelation: { type: "list" },
    },
    Like: {
      id: "kjzl6hvfrbw6c9iy4fidutlrlvxjyitc94jex3zf5ua08iqao5xop7ea9iphaq7",
      accountRelation: { type: "list" },
    },
    LikeAudio: {
      id: "kjzl6hvfrbw6c9sazqxg93gq13fyzmgplwq443viqepy7n2b0nm9mvrtni45vbn",
      accountRelation: { type: "list" },
    },
  },
  objects: {
    User: {
      name: { type: "string", required: true },
      creator: { type: "boolean", required: true },
      followers: { type: "integer", required: false },
      did: { type: "view", viewType: "documentAccount" },
    },
    Audio: {
      likes: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "queryConnection",
          model:
            "kjzl6hvfrbw6c9iy4fidutlrlvxjyitc94jex3zf5ua08iqao5xop7ea9iphaq7",
          property: "audioID",
        },
      },
      title: { type: "string", required: true },
      public: { type: "boolean", required: true },
      deleted: { type: "boolean", required: true },
      audioImage: { type: "string", required: true },
      audioTrack: { type: "string", required: true },
      creator: { type: "view", viewType: "documentAccount" },
    },
    Follow: {
      status: { type: "boolean", required: true },
      following: { type: "did", required: true },
      follower: { type: "view", viewType: "documentAccount" },
    },
    Like: {
      liker: { type: "did", required: true },
      status: { type: "boolean", required: true },
    },
    LikeAudio: {
      likeID: { type: "streamid", required: true },
      audioID: { type: "streamid", required: true },
      like: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "document",
          model:
            "kjzl6hvfrbw6c9iy4fidutlrlvxjyitc94jex3zf5ua08iqao5xop7ea9iphaq7",
          property: "likeID",
        },
      },
      audio: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "document",
          model:
            "kjzl6hvfrbw6c50tlukwnjvr4dekfh1wdttx3za0uedgjp804o3dt6xknf2vq5c",
          property: "audioID",
        },
      },
    },
  },
  enums: {},
  accountData: {
    user: { type: "node", name: "User" },
    audioList: { type: "connection", name: "Audio" },
    followList: { type: "connection", name: "Follow" },
    likeList: { type: "connection", name: "Like" },
    likeAudioList: { type: "connection", name: "LikeAudio" },
  },
};
