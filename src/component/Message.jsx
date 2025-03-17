import React, { useState } from "react";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserIcon from "./UserIcon";
import { doc, deleteDoc } from "firebase/firestore";
import { useFirebase } from "../Initializer";

function Message(props) {
  const { firestore, user } = useFirebase();
  
  const isSenderPresent = props.currentUser.uid !== props.uid; // Check if the sender is not the current user
  const alignLeft = isSenderPresent; // Align left if the sender is not the current user

  // State for the menu anchor element
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Function to handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle reply action
  const handleReply = () => {
    handleMenuClose();
    // Implement reply functionality here
    console.log("Reply to:", props.content);
  };

  // Function to handle delete action
  const handleDelete = async() => {
    handleMenuClose();
    const docRef = doc(firestore, "messages", props.docId);
    await deleteDoc(docRef);
    console.log(props);
    console.log("Delete message:", props.docId);
  };

  // Function to determine the background color based on dark mode and alignment
  function getColorScheme() {
    if (!props.darkMode) {
      return alignLeft ? '#e2f3ea' : '#cae6ff';
    } else {
      return alignLeft ? '#303030' : '#606060';
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        margin: '10px',
        alignItems: 'flex-start',
        marginBottom: 2,
        justifyContent: alignLeft ? 'flex-start' : 'flex-end',
      }}
    >
      {/* Display the sender's icon if the sender is not the current user */}
      {isSenderPresent && <UserIcon img={props.sender} sx={{ width: 32, height: 32, marginRight: 1 }} />}

      <Box
        sx={{
          backgroundColor: getColorScheme(),
          padding: 1.5,
          borderRadius: 1,
          maxWidth: '70%',
          position: 'relative', // Added for positioning the menu button
        }}
      >
        {/* Display the sender's name if the sender is not the current user */}
        {isSenderPresent && (
          <Typography
            variant="subtitle2"
            component="p"
            sx={{ fontWeight: 'bold', marginBottom: 0.5, color: props.darkMode ? '#fff' : '#000' }}
          >
            {props.senderName || "Unknown"} {/* Display the sender's name */}
          </Typography>
        )}

        {/* Display the message content */}
        <Typography variant="body1" component="p" sx={{ margin: 0, wordWrap: 'break-word' }}>
          {props.content}
        </Typography>

        {/* Display the message time */}
        <Typography variant="caption" component="footer" sx={{ fontSize: 12, color: '#777' }}>
          {props.time}
        </Typography>

        {/* Triple dot menu button */}
        <IconButton
          aria-label="more"
          aria-controls="message-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: props.darkMode ? '#fff' : '#000',
          }}
        >
          <MoreVertIcon />
        </IconButton>

        {/* Menu for reply and delete options */}
        <Menu
          id="message-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleReply}>Reply</MenuItem>
          {props.uid===user.uid && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
        </Menu>
      </Box>

      {/* Display the sender's icon if the sender is the current user */}
      {!isSenderPresent && <UserIcon img={props.sender} sx={{ width: 32, height: 32, marginLeft: 1 }} />}
    </Box>
  );
}

export default Message;


