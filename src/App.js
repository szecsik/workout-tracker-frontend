import logo from './logo.svg';
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
import PageNotFound from './404page';
import Progress from './progress'
import {userPage} from './userpagehoc';
import Login from './login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import User from './user';

import './App.css';

function App() {
  const drawerWidth = 260;

const MainPageWithHOC = userPage(MainPage);
const DetailPageWithHOC= userPage(DetailPage);
const ProgressPageWithHOC= userPage(Progress);

  return (

    <div className="App" sx={{backgroundColor:'#ebebeb'}}>
    <Router>
    <Routes>
           <Route path="/user/*" element={<User />}/>
           <Route path="/" element={<Login />}/>
           <Route path="/user/" element={<MainPageWithHOC />}/>
           <Route path="/user/:exc" element={<DetailPageWithHOC />}/>
           <Route path="404" element={<PageNotFound />}/>
           <Route path="/progress" element={<ProgressPageWithHOC />}/>

     </Routes>
   </Router>
    </div>
  );
}

export default App;
