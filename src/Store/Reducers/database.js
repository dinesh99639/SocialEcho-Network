import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: {
    1679737567241: {
      id: 1679737567241,
      username: 'anonymous',
      name: 'Anonymous',
      totalPosts: 0,
      totalLikes: 0,
      lastPostedTimestamp: 0,
      dailyStreaks: 0,
    },
    1679737567242: {
      id: 1679737567242,
      username: 'vandhana.ram',
      name: 'Vandhana Ram',
      totalPosts: 0,
      totalLikes: 1,
      lastPostedTimestamp: 0,
      dailyStreaks: 0,
    },
    1679737567243: {
      id: 1679737567243,
      username: 'anjali.vanga',
      name: 'Anjali Vanga',
      totalPosts: 1,
      totalLikes: 1,
      lastPostedTimestamp: 1679845120539,
      dailyStreaks: 1,
    },
    1679737567244: {
      id: 1679737567244,
      username: 'shristhi.singh',
      name: 'Shrishti Singh',
      totalPosts: 0,
      totalLikes: 1,
      lastPostedTimestamp: 0,
      dailyStreaks: 0,
    },
  },

  posts: {
    1: {
      id: 1,
      postedTimestamp: 1679737567344,
      userId: 1679737567243,
      imageURL: '',
      content: `If there were to be a national snack that all Indians unanimously LOVE, it would have to be Maggi!. For 40 years now, people of all ages no matter their economic background, have turned to Maggi to satisfy their random snack cravings. In fact, in India, instant noodles are literally synonymous with Maggi.`,
      likes: [1679737567244],
      replies: [1679738567241, 1679738567243],
    },
  },

  replies: {
    1679738567241: {
      id: 1679738567241,
      parentPostId: 1,
      userId: 1679737567244,
      content: `I absolutely didn't know that Maggi was actually directly targeting working women and mothers. Although, I remember their ads were focused on that messaging. But, still, never thoughts that they were so laser-focused on that demographic. Thanks for sharing! Looking forward to Part 2 :)`,
      likes: [1679737567243],
      replies: [1679738567242],
    },
    1679738567242: {
      id: 1679738567242,
      parentReplyId: 1679738567241,
      userId: 1679737567243,
      content: `Glad you liked it, Shrishti!`,
      likes: [],
      replies: [],
    },
    1679738567243: {
      id: 1679738567243,
      parentPostId: 1,
      userId: 1679737567242,
      content: `The "catch them young!" point is so correct. People who grew up with Maggi, can't switch to a different brand. But, I wonder if the kids today have the same obsession with Maggi as some of the GenZs and Millenials do. Probably explain their falling market share.`,
      likes: [1679737567243],
      replies: [1679738567244],
    },
    1679738567244: {
      id: 1679738567244,
      parentReplyId: 1679738567243,
      userId: 1679737567243,
      content: `Absolutely Vandhana. But, we don't have any empirical evidence stating if Maggi's popularity has increased or decreased among the current school-going kids. Nestle and Maggi's numbers look strong and they are growing every year. But, you are correct, their market share has come down. That could partly be the result of the 2015 ban`,
      likes: [],
      replies: [],
    },
  },
};

const database = createSlice({
  name: 'database',
  initialState: initialState,

  reducers: {
    reset: () => initialState,

    addUser: (state, { payload }) => {
      state.users[payload.id] = payload;
    },

    addNewPost: (state, { payload }) => {
      state.posts[payload.id] = payload;
      state.users[payload.userId].totalPosts += 1;
    },
    updatePost: (state, { payload }) => {
      state.posts[payload.id].imageURL = payload.imageURL;
      state.posts[payload.id].content = payload.content;
    },
    deletePost: (state, { payload }) => {
      const post = state.posts[payload.id];

      state.users[post.userId].totalPosts -= 1;
      state.users[post.userId].totalLikes -=
        state.posts[payload.id].likes.length;

      let remainingIds = state.posts[payload.id].replies;
      let toBeDeletedNext = [];

      while (remainingIds.length !== 0) {
        remainingIds.forEach((replyId) => {
          const currentReply = state.replies[replyId];

          toBeDeletedNext.push(...currentReply.replies);
          state.users[currentReply.userId].totalLikes -=
            currentReply.likes.length;
          delete state.replies[replyId];
        });

        remainingIds = toBeDeletedNext;
        toBeDeletedNext = [];
      }

      delete state.posts[payload.id];
    },
    addReplyToPost: (state, { payload }) => {
      state.posts[payload.parentId].replies.push(payload.data.id);
      state.replies[payload.data.id] = payload.data;
    },
    addLikeToPost: (state, { payload }) => {
      state.posts[payload.postId].likes.push(payload.userId);
      state.users[payload.postAuthorId].totalLikes += 1;
    },
    removeLikeFromPost: (state, { payload }) => {
      state.posts[payload.postId].likes = state.posts[
        payload.postId
      ].likes.filter((userId) => userId !== payload.userId);
      state.users[payload.postAuthorId].totalLikes -= 1;
    },

    updateReply: (state, { payload }) => {
      state.replies[payload.id].content = payload.content;
    },
    deleteReply: (state, { payload }) => {
      const reply = state.replies[payload.id];

      if (!!reply.parentPostId) {
        state.posts[reply.parentPostId].replies = state.posts[
          reply.parentPostId
        ].replies.filter((replyId) => replyId !== reply.id);
      } else if (!!reply.parentReplyId) {
        state.replies[reply.parentReplyId].replies = state.replies[
          reply.parentReplyId
        ].replies.filter((replyId) => replyId !== reply.id);
      }

      state.users[reply.userId].totalLikes -= reply.likes.length;

      let remainingIds = reply.replies;
      let toBeDeletedNext = [];

      while (remainingIds.length !== 0) {
        remainingIds.forEach((replyId) => {
          const currentReply = state.replies[replyId];

          toBeDeletedNext.push(...currentReply.replies);
          state.users[currentReply.userId].totalLikes -=
            currentReply.likes.length;
          delete state.replies[replyId];
        });

        remainingIds = toBeDeletedNext;
        toBeDeletedNext = [];
      }

      delete state.replies[payload.id];
    },
    addReplyToReply: (state, { payload }) => {
      state.replies[payload.parentId].replies.push(payload.data.id);
      state.replies[payload.data.id] = payload.data;
    },
    addLikeToReply: (state, { payload }) => {
      state.replies[payload.replyId].likes.push(payload.userId);
      state.users[payload.postAuthorId].totalLikes += 1;
    },
    removeLikeFromReply: (state, { payload }) => {
      state.replies[payload.replyId].likes = state.replies[
        payload.replyId
      ].likes.filter((userId) => userId !== payload.userId);
      state.users[payload.postAuthorId].totalLikes -= 1;
    },
  },
});

export default database;
