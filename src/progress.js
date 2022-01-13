import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CellComp from './cell';
import Typography from '@mui/material/Typography';
import ProgressCard from './progressCard';
import {useState, useEffect} from 'react';

const Progress = () =>{

  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const [data, setData] = useState(null);

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

return(
  <Box sx={{width:'100%', padding:'18px'}}>
    <Box sx={{ flexGrow: 1 }}>
         <Grid container spacing={3}>
         {data ? Array.from(Object.keys(data.exerciseList)).map((d)=>{

           return  <ProgressCard key={d.name} data={data.exerciseList[d]} type={d}/>
         }) : <p></p>}

         </Grid>
       </Box>

  </Box>
)

}

export default Progress;
