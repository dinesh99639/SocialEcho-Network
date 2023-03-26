import { useState } from 'react';
import { connect } from 'react-redux';

import { Box, InputBase, Button } from '@mui/material';

import database from '../../../Store/Reducers/database';

const NewReply = (props) => {
  const {
    parentPostId,
    parentReplyId,
    currentUser,
    addReplyToPost,
    addReplyToReply,
    setShowAddComment,
  } = props;

  const [content, setContent] = useState('');

  const submitReply = () => {
    if (content.trim().length === 0) return;

    const replyId = new Date().getTime();

    const data = {
      id: replyId,
      parentPostId,
      parentReplyId,
      userId: currentUser.id,
      content: content,
      likes: [],
      replies: [],
    };

    if (!!parentPostId) {
      addReplyToPost({
        parentId: parentPostId,
        data: data,
      });
    } else if (!!parentReplyId) {
      addReplyToReply({
        parentId: parentReplyId,
        data: data,
      });
    }

    setShowAddComment(false);
    setContent('');
  };

  return (
    <Box>
      <InputBase
        fullWidth
        placeholder="Write your reply"
        multiline
        rows={3}
        sx={{
          flex: 1,
          border: '1px solid #d5d5d5',
          borderRadius: '4px',
          padding: '10px',
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        size="small"
        variant="outlined"
        sx={{
          margin: '5px 0',
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={submitReply}
      >
        Reply
      </Button>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { application } = state;

  return { currentUser: application.currentUser };
};

const mapDispatchToProps = {
  addReplyToPost: database.actions.addReplyToPost,
  addReplyToReply: database.actions.addReplyToReply,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReply);
