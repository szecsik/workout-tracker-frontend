import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import Nav from './nav';


export const userPage = (WrappedComponent)=>{

return () =>{
 const drawerWidth = 260;
 return (

 <Box sx={{display:'flex'}}>
 <Drawer primary
 sx={{

  width: drawerWidth,
 backgroundColor:'#616161',
  flexShrink: 0,

  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor:'#363636'

  },
 }}
 variant="permanent"
 anchor="left"
 >
 <Box sx={{
   color:'#c2c2c2',
   display:'flex',
   alignItems:'center',
   padding:'18px',
 }}>
   <Avatar alt="Remy Sharp" src="/dudus.jpg"
    sx={{ width: 50, height: 50, marginLeft:'8px'}}
   />
   <Typography ml={2}  sx={{fontFamily:'Roboto!important'}}>Hi Krisztián!</Typography>
 </Box>
 <Divider/>
 <Box sx={{
     color:'#e0e0e0',
   }}>

 <Nav />
 </Box>



 </Drawer>
 <WrappedComponent />
 </Box>

)}

}
