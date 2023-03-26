import { useState } from 'react';
import { connect } from 'react-redux';
import Jdenticon from 'react-jdenticon';

import {
  Box,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  InputBase,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ReplyIcon from '@mui/icons-material/Reply';

import database from '../../../Store/Reducers/database';

import NewReply from '../NewReply/NewReply';
import ConfirmDeleteModal from '../../Contacts/ConfirmDeleteModal';

const ReplyActions = (props) => {
  const { currentUser, users, reply, addLikeToReply, removeLikeFromReply } =
    props;

  const [showAddComment, setShowAddComment] = useState(false);

  const upvote = () => {
    if (currentUser.id === reply.userId) return;

    const isLiked = reply.likes.find((userId) => userId === currentUser.id);

    if (!isLiked) {
      addLikeToReply({
        replyId: reply.id,
        userId: currentUser.id,
        postAuthorId: reply.userId,
      });
    } else {
      removeLikeFromReply({
        replyId: reply.id,
        userId: currentUser.id,
        postAuthorId: reply.userId,
      });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', columnGap: '10px', padding: '0 5px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Up votes">
            <IconButton onClick={upvote}>
              <ArrowDropUpIcon sx={{ fontSize: '15px', scale: '3' }} />
            </IconButton>
          </Tooltip>
          <Typography fontSize="12px">{reply.likes.length}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Show all comments">
            <IconButton>
              <ChatBubbleOutlineOutlinedIcon
                sx={{ fontSize: '15px', scale: '1.2', color: '#0184c7' }}
              />
            </IconButton>
          </Tooltip>
          <Typography fontSize="12px">{reply.replies.length}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => setShowAddComment((prev) => !prev)}>
            <ReplyIcon sx={{ fontSize: '15px', scale: '1.3' }} />
          </IconButton>
          <Typography fontSize="13px">Reply</Typography>
        </Box>
      </Box>

      {showAddComment && (
        <Grid container>
          <Grid item xs={1}>
            <Box sx={{ textAlign: 'center', padding: '7px 0' }}>
              <Jdenticon size="28" value={users[reply.userId].name} />
            </Box>
          </Grid>
          <Grid item xs={11}>
            <Box sx={{ marginRight: '15px' }}>
              <NewReply
                parentReplyId={reply.id}
                setShowAddComment={setShowAddComment}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

const ReplyContent = (props) => {
  const { isEditMode, reply, setIsEditMode, updateReply } = props;

  const [content, setContent] = useState(reply.content ?? '');

  const update = () => {
    if (content.trim().length === 0) return;

    updateReply({
      id: reply.id,
      content: content.trim(),
    });
    setIsEditMode(false);
  };

  const cancel = () => {
    setIsEditMode(false);
    setContent(reply.content);
  };

  return (
    <>
      {(isEditMode && (
        <Box sx={{ padding: '0 5px' }}>
          <InputBase
            fullWidth
            placeholder="Content"
            multiline
            rows={4}
            sx={{
              flex: 1,
              border: '1px solid #d5d5d5',
              borderRadius: '4px',
              padding: '10px',
              margin: '10px 0',
              fontSize: '15px',
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Box sx={{ display: 'flex', columnGap: '10px' }}>
            <Button
              size="small"
              variant="outlined"
              sx={{
                margin: '5px 0',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={update}
            >
              Update
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{
                margin: '5px 0',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={cancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )) || (
        <>
          <Typography
            component="pre"
            fontSize="14px"
            sx={{ whiteSpace: 'pre-line' }}
          >
            {reply.content}
          </Typography>
        </>
      )}
    </>
  );
};

const Reply = (props) => {
  const {
    currentUser,
    users,
    replies,
    reply,
    addLikeToReply,
    removeLikeFromReply,
    updateReply,
    deleteReply,
    showAllComments,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteReplyModal, setDeleteReplyModal] = useState({
    open: false,
    replyId: null,
  });

  const onDeleteConfirm = () => {
    deleteReply({ id: deleteReplyModal.replyId });
    setDeleteReplyModal({
      open: false,
      replyId: null,
    });
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={1}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', padding: '7px 0' }}
          >
            <Box sx={{ width: { xs: '15px', sm: '28px' } }}>
              <Jdenticon size="100%" value={users[reply.userId].name} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={11}>
          <Box
            sx={{
              border: '1px solid lightgray',
              borderRadius: '7px',
              padding: '10px',
              marginRight: '15px',
              display: 'flex',
              flexDirection: 'column',
              rowGap: '5px',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography fontSize="15px" fontWeight="bold">
                {users[reply.userId].name}
              </Typography>

              {currentUser.id === reply.userId && (
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
                        setIsEditMode(true);
                        setAnchorEl(null);
                      }}
                    >
                      Edit comment
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setDeleteReplyModal({
                          open: true,
                          replyId: reply.id,
                        });
                        setAnchorEl(null);
                      }}
                    >
                      Delete comment
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Box>
            <ReplyContent
              reply={reply}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              updateReply={updateReply}
            />
          </Box>

          <ReplyActions
            users={users}
            reply={reply}
            currentUser={currentUser}
            addLikeToReply={addLikeToReply}
            removeLikeFromReply={removeLikeFromReply}
          />

          {!!reply.replies.length && showAllComments && (
            <Box>
              <Replies
                users={users}
                currentUser={currentUser}
                replies={replies}
                replyIds={reply.replies}
                addLikeToReply={addLikeToReply}
                removeLikeFromReply={removeLikeFromReply}
                updateReply={updateReply}
                deleteReply={deleteReply}
              />
            </Box>
          )}
        </Grid>
      </Grid>

      <ConfirmDeleteModal
        open={deleteReplyModal.open}
        message="Are you sure you want to delete this comment?"
        onConfirm={onDeleteConfirm}
        onCancel={() => setDeleteReplyModal({ open: false, replyId: null })}
      />
    </Box>
  );
};

const Replies = (props) => {
  const {
    currentUser,
    users,
    replies,
    replyIds,
    addLikeToReply,
    removeLikeFromReply,
    updateReply,
    deleteReply,
    showAllComments,
  } = props;

  const filteredReplyIds = showAllComments
    ? replyIds
    : (replyIds.length !== 0 && [replyIds[0]]) || [];

  return (
    <Box
      sx={{
        padding: '10px 0',
        display: !!replyIds.length ? 'flex' : 'none',
        flexDirection: 'column',
        rowGap: '10px',
      }}
    >
      {filteredReplyIds.map((replyId) => {
        const reply = replies[replyId];

        return (
          <Reply
            key={reply.id}
            users={users}
            replies={replies}
            reply={reply}
            currentUser={currentUser}
            addLikeToReply={addLikeToReply}
            removeLikeFromReply={removeLikeFromReply}
            updateReply={updateReply}
            deleteReply={deleteReply}
            showAllComments={showAllComments}
          />
        );
      })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { database, application } = state;

  return {
    users: database.users,
    replies: database.replies,
    currentUser: application.currentUser,
  };
};

const mapDispatchToProps = {
  addLikeToReply: database.actions.addLikeToReply,
  removeLikeFromReply: database.actions.removeLikeFromReply,
  updateReply: database.actions.updateReply,
  deleteReply: database.actions.deleteReply,
};

export default connect(mapStateToProps, mapDispatchToProps)(Replies);
