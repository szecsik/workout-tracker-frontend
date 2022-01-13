import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React,{useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import AddForm from './addform';
import ExerciseCard from './exercisecard';
import {useParams} from 'react-router-dom';


import CellComp from './cell'

const MainPage=()=>{
const {username} = useParams();
const [open, setOpen] = useState(false);
const [type, setType] = useState(null);
const [data, setData] = useState(null);
const clickaway=()=>{
  setOpen(false)
  setType(null)
}

const refresh = async()=>{
try{

let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+window.localStorage.getItem('token'));
myHeaders.append("Content-Type", "application/json");
  const getData=await fetch(`http://localhost:8080/profile`, {
  method: 'GET',
  headers: myHeaders
})

if(getData.status != 200){
  throw new Error(`status: ${getData.status}`)
}

  const getJson = await getData.json();
  setData(getJson)
}catch(e){
  if(e.message == 'status: 404'){
    document.location='/404'
  }else{
    document.location='/'
  }
}

}

useEffect( ()=>{
refresh();

},[1])


console.log(data)
return (<Box sx={{width:'100%', padding:'18px'}}>
<Backdrop
       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
       open={open}
       onClick={(e)=>{
if (e.currentTarget == e.target){
clickaway()
}

       }}
     >

      {type ? <AddForm type={type} clickaway={clickaway} exc={data.exerciseList[type]} refresh={refresh}/> : <p></p>}

     </Backdrop>

  <Box sx={{ flexGrow: 1 }}>
       <Grid container spacing={3}>
       {data ? Array.from(Object.keys(data.exerciseList)).map((d)=>{

         return  <ExerciseCard key={d.name} data={data.exerciseList[d]} setType={setType} setOpen={setOpen} type={d}/>
       }) : <p></p>}

       </Grid>
     </Box>

</Box>
)
}

export default MainPage;
