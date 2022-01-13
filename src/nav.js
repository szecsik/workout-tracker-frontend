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
import {Link,useNavigate} from 'react-router-dom';

const Nav = () =>{

const history = useNavigate();
const [active, setActive] = useState(document.location.pathname)
console.log(document.location.pathname === '/progress' || '/user/Bench%20Press');

return <List>
    {[{name : 'Latest Workouts',location:'/user'}, {name: 'Workout Progress', location:'/progress'},{name:'User Profile',location:'/profile'}].map((text, index) => (
      <Fragment>
      <ListItem button key={text.name}  onClick={()=>history(text.location)} mt={2} className={active == text.location ? 'active' : ''}  sx={{padding:'12px 10px 12px 20px',fontWeight:'200', fontFamily:'Roboto',fontSize:'18px',
      "&:hover": {backgroundColor:"#545454"}
    }}>
        <ListItemIcon sx={{minWidth:'40px', color:'#e0e0e0'}}>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText className='navlink'>{text.name}</ListItemText>
      </ListItem>

      </Fragment>
    ))}
    <ListItem button mt={2}  sx={{padding:'12px 10px 12px 20px',fontWeight:'200', fontFamily:'Roboto',fontSize:'18px',
    "&:hover": {backgroundColor:"#545454"}
    }}
 onClick={()=>{
   window.localStorage.removeItem('token');
   document.location='/';
 }}
    >
      <ListItemIcon sx={{minWidth:'40px', color:'#e0e0e0'}}>
         <LogoutIcon />
      </ListItemIcon>
      <li>Logout</li>
    </ListItem>

  </List>

  }

  export default Nav;
