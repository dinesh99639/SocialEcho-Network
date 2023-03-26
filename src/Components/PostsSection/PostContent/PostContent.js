import { useState } from 'react';
import { connect } from 'react-redux';

import { Box, Typography, InputBase, Button } from '@mui/material';

import ImageIcon from '@mui/icons-material/Image';

import database from '../../../Store/Reducers/database';

const PostContent = (props) => {
  const { isEditMode, setIsEditMode, updatePost } = props;

  const [imageURL, setImageURL] = useState(props.imageURL ?? '');
  const [content, setContent] = useState(props.content ?? '');

  const update = () => {
    if (content.trim().length === 0) return;

    updatePost({
      id: props.postId,
      imageURL,
      content: content.trim(),
    });
    setIsEditMode(false);
  };

  const cancel = () => {
    setIsEditMode(false);
    setImageURL(props.imageURL);
    setContent(props.content);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {(isEditMode && (
        <Box sx={{ padding: '10px' }}>
          <InputBase
            fullWidth
            placeholder="Image URL"
            startAdornment={<ImageIcon sx={{ padding: '0 10px' }} />}
            sx={{
              flex: 1,
              border: '1px solid #d5d5d5',
              borderRadius: '25px',
            }}
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />

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
          {!!props.imageURL && (
            <img src={props.imageURL} alt="Post" style={{ width: '100%' }} />
          )}
          {!!props.content && (
            <Typography
              component="pre"
              fontSize="15px"
              sx={{ padding: '10px', whiteSpace: 'pre-line' }}
            >
              {props.content}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  updatePost: database.actions.updatePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);
