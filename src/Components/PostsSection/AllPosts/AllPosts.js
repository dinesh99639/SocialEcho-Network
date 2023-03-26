import { useState } from 'react';
import { connect } from 'react-redux';

import { Box } from '@mui/material';

import database from '../../../Store/Reducers/database';

import Post from '../Post/Post';
import ConfirmDeleteModal from '../../Contacts/ConfirmDeleteModal';

const AllPosts = (props) => {
  const posts = Object.values(props.posts);

  const [deletePostModal, setDeletePostModal] = useState({
    open: false,
    postId: null,
  });

  const onDeleteConfirm = () => {
    props.deletePost({ id: deletePostModal.postId });
    setDeletePostModal({
      open: false,
      postId: null,
    });
  };

  return (
    <Box
      sx={{
        padding: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '15px',
        marginBottom: '20px',
      }}
    >
      {posts
        .sort((post1, post2) => post2.postedTimestamp - post1.postedTimestamp)
        .map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              setDeletePostModal={setDeletePostModal}
            />
          );
        })}

      <ConfirmDeleteModal
        open={deletePostModal.open}
        message="Are you sure you want to delete this post?"
        onConfirm={onDeleteConfirm}
        onCancel={() => setDeletePostModal({ open: false, postId: null })}
      />
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { database } = state;

  return { posts: database.posts };
};

const mapDispatchToProps = {
  deletePost: database.actions.deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
