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
import List from '@mui/material/List';
import {Fragment} from 'react';
import MainPage from './mainpage'
import DetailPage from './detailpage';
import PageNotFound from './404page'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const User = () =>{
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

  <List>
      {['Latest Workouts', 'Workout Progress','User Profile'].map((text, index) => (
        <Fragment>
        <ListItem button key={text} mt={2}  sx={{padding:'12px 10px 12px 20px',fontWeight:'200', fontFamily:'Roboto',fontSize:'18px',
        "&:hover": {backgroundColor:"#545454"}
      }}>
          <ListItemIcon sx={{minWidth:'40px', color:'#e0e0e0'}}>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <li>{text}</li>
        </ListItem>

        </Fragment>
      ))}
    </List>
  </Box>



 </Drawer>
 <Router>
 <Routes>
        <Route path="/user/:username" element={<MainPage />}/>
        <Route path="/user/:username/:exc" element={<DetailPage />}/>
        <Route path="404" element={<PageNotFound />}/>

  </Routes>
</Router>
    </Box>
)

}

export default User;
