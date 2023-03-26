import { useState } from 'react';
import { connect } from 'react-redux';

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputBase,
  Button,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';

import database from '../../../Store/Reducers/database';

import PostContent from '../PostContent/PostContent';

const NewPost = (props) => {
  const { currentUser, addNewPost } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [content, setContent] = useState('');

  const submitPost = () => {
    const postId = new Date().getTime();

    addNewPost({
      id: postId,
      postedTimestamp: postId,
      userId: currentUser.id,
      imageURL: imageURL,
      content: content,
      likes: [],
      replies: [],
    });

    setIsExpanded(false);
    setImageURL('');
    setContent('');
  };

  return (
    <Box sx={{ padding: '20px 5px' }}>
      <Accordion expanded={isExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <Typography>New post</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
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
          </Box>

          <Box>
            <Typography>Preview</Typography>
            <Box
              sx={{
                borderRadius: '4px',
                border: '1px solid #d5d5d5',
              }}
            >
              <PostContent imageURL={imageURL} content={content} />
            </Box>
          </Box>

          <Button
            size="small"
            variant="outlined"
            sx={{
              margin: '5px 0',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={submitPost}
          >
            Post
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const mapStateToProps = (state) => {
  const { application } = state;

  return { currentUser: application.currentUser };
};

const mapDispatchToProps = {
  addNewPost: database.actions.addNewPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
