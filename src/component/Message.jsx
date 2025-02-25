
/*

import React from "react";
import { Box, Typography } from "@mui/material";
import UserIcon from "./UserIcon";

function Message(props) {
  const isSenderPresent = props.currentUser.uid != props.uid
  const alignLeft = isSenderPresent
  function getColorScheme() {
    if (!props.darkMode) {
      return alignLeft ? '#e2f3ea' : '#cae6ff';
    }
    else {
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
      {isSenderPresent && <UserIcon img={props.sender} sx={{ width: 32, height: 32, marginRight: 1 }} />}
      <Box
        sx={{
          backgroundColor: getColorScheme(),
          padding: 1.5,
          borderRadius: 1,
          maxWidth: '70%',
        }}
      >
        <Typography variant="body1" component="p" sx={{ margin: 0, wordWrap: 'break-word' }}>
          {props.content}
        </Typography>
        <Typography variant="caption" component="footer" sx={{ fontSize: 12, color: '#777' }}>
          {props.time}
        </Typography>
      </Box>
      {!isSenderPresent && <UserIcon img={props.sender} sx={{ width: 32, height: 32, marginLeft: 1 }} />}
    </Box>
  );
}

export default Message;


*/


import React from "react";
import { Box, Typography } from "@mui/material";
import UserIcon from "./UserIcon";

function Message(props) {
  const isSenderPresent = props.currentUser.uid !== props.uid; // Check if the sender is not the current user
  const alignLeft = isSenderPresent; // Align left if the sender is not the current user

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
      </Box>

      {/* Display the sender's icon if the sender is the current user */}
      {!isSenderPresent && <UserIcon img={props.sender} sx={{ width: 32, height: 32, marginLeft: 1 }} />}
    </Box>
  );
}

export default Message;