import { useState } from 'react';
import { connect } from 'react-redux';
import Jdenticon from 'react-jdenticon';

import {
  Box,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReplyIcon from '@mui/icons-material/Reply';

import database from '../../../Store/Reducers/database';

import PostContent from '../PostContent/PostContent';
import NewReply from '../../Replies/NewReply/NewReply';
import Replies from '../../Replies/Replies/Replies';

const PostHeader = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '5px 13px',
        borderTop: '1px solid lightgray',
        columnGap: '10px',
      }}
    >
      <Box sx={{ '& div': { height: '28px' } }}>
        <Jdenticon size="28" value={props.authorName} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '15rem',
        }}
      >
        <Typography variant="div" noWrap>
          {props.authorName}
        </Typography>
      </Box>
      {props.currentUser.id === props.post.userId && (
        <Box sx={{ marginLeft: 'auto', textAlign: 'right' }}>
          <IconButton
            size="small"
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon fontSize="20px" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            sx={{ '& .MuiMenuItem-root': { fontSize: '14px' } }}
          >
            <MenuItem
              onClick={() => {
                props.setIsEditMode(true);
                setAnchorEl(null);
              }}
            >
              Edit post
            </MenuItem>
            <MenuItem
              onClick={() => {
                props.setDeletePostModal({
                  open: true,
                  postId: props.post.id,
                });
                setAnchorEl(null);
              }}
            >
              Delete post
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

const PostActions = (props) => {
  const {
    post,
    likes,
    replies,
    currentUser,
    addLikeToPost,
    removeLikeFromPost,
  } = props;

  const [showAddComment, setShowAddComment] = useState(false);

  const upvote = () => {
    if (currentUser.id === post.userId) return;

    const isLiked = likes.find((userId) => userId === currentUser.id);

    if (!isLiked) {
      addLikeToPost({
        postId: post.id,
        userId: currentUser.id,
        postAuthorId: post.userId,
      });
    } else {
      removeLikeFromPost({
        postId: post.id,
        userId: currentUser.id,
        postAuthorId: post.userId,
      });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          columnGap: '10px',
          borderTop: '1px solid lightgray',
          borderBottom: '1px solid lightgray',
          padding: '0 5px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Up votes">
            <IconButton onClick={upvote}>
              <ArrowDropUpIcon sx={{ fontSize: '15px', scale: '3' }} />
            </IconButton>
          </Tooltip>
          <Typography fontSize="12px">{likes.length}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Show all comments">
            <IconButton>
              <ChatBubbleOutlineOutlinedIcon
                sx={{ fontSize: '15px', scale: '1.2', color: '#0184c7' }}
              />
            </IconButton>
          </Tooltip>
          <Typography fontSize="12px">{replies.length}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setShowAddComment((prev) => !prev)}>
            <ReplyIcon sx={{ fontSize: '17px', scale: '1.1' }} />
          </IconButton>
          <Typography fontSize="14px">Reply</Typography>
        </Box>
      </Box>

      {showAddComment && (
        <Box sx={{ padding: '10px', borderBottom: '1px solid lightgray' }}>
          <NewReply
            parentPostId={post.id}
            setShowAddComment={setShowAddComment}
          />
        </Box>
      )}
    </Box>
  );
};

const Post = (props) => {
  const { post, users, currentUser, addLikeToPost, removeLikeFromPost } = props;

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <Box>
      <Paper elevation={1}>
        <PostHeader
          post={post}
          currentUser={currentUser}
          authorName={users[post.userId].name}
          setIsEditMode={setIsEditMode}
          setDeletePostModal={props.setDeletePostModal}
        />
        <PostContent
          postId={post.id}
          imageURL={post.imageURL}
          content={post.content}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
        <PostActions
          post={post}
          likes={post.likes}
          replies={post.replies}
          currentUser={currentUser}
          addLikeToPost={addLikeToPost}
          removeLikeFromPost={removeLikeFromPost}
        />
        <Replies replyIds={post.replies} />
      </Paper>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { database, application } = state;

  return { users: database.users, currentUser: application.currentUser };
};

const mapDispatchToProps = {
  addLikeToPost: database.actions.addLikeToPost,
  removeLikeFromPost: database.actions.removeLikeFromPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
