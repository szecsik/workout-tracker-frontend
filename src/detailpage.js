import {useParams} from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dateFormat, { masks } from "dateformat";
import { LineChart, Line, CartesianGrid, XAxis, YAxis ,ResponsiveContainer} from 'recharts';

const DetailPage = () =>{

const {username, exc} = useParams();
const [data, setData] = useState(null);

const refresh = async()=>{
try{
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+window.localStorage.getItem('token'));
  myHeaders.append("Content-Type", "application/json");
  const getData=await fetch(`http://localhost:8080/details?name=${exc}&limit=20`, {
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
  }
}

}

const dummydata = [{name: 'Page A', uv: 600},{name: 'Page B', uv: 400},{name: 'Page B', uv: 400},{name: 'Page B', uv: 200}];

useEffect( ()=>{
refresh();

},[1])

  return( <Box sx={{width:'100%'}}>
  <Box sx={{padding: '12px 10px', backgroundColor:'#363636', color:'#e0e0e0', textAlign:'left'}}><Typography sx={{width:'fit-content'}}>{exc}</Typography></Box>

  <Box>
  <Box sx={{display:'flex', flexWrap:'wrap' }} >
  <Grid sx={{padding: '16px 6px 0 16px' ,color:'#e0e0e0', textAlign:'left', width:'47%'}} xs={12} xl={12} md={12}>
  <Paper >
  <Typography variant={"h6"} align={"left"} ml={1} mb={1} pt={1} pl={1} pb={1} sx={{color:'#7986cb', fontSize:'16px'}}>Workout Progress</Typography>
<ResponsiveContainer  width={"99%"} height={300}>
<LineChart  data={data ? data.exerciseList.map((d)=>{return {name:dateFormat(new Date(d.date),'yyyy-mm-dd'),uv:d.weight }}): null}>
<Line type="monotone" dataKey="uv" stroke="#8884d8" />
<CartesianGrid stroke="#ccc" />
<XAxis  interval="preserveStart"/>

<YAxis type="number" domain={['dataMin', 'dataMax']} />
</LineChart>
</ResponsiveContainer >
</Paper>

  </Grid>
  <Grid sx={{width:'50%',padding:'16px 6px 8px 16px'}}  xs={12} xl={12} md={12} pt={2}>
 <Paper><Typography variant={"h6"} align={"left"} ml={1} mb={1} pt={1}  sx={{color:'#7986cb', fontSize:'16px'}}>History</Typography>
         <TableContainer >
             <Table >
             <TableHead sx={{backgroundColor:'#ec407a'}}>
     <TableRow>
         <TableCell align="left">Date</TableCell>
       <TableCell align="left">Weight</TableCell>
       <TableCell align="left">Reps</TableCell>

     </TableRow>
   </TableHead>
   <TableBody>
   {data ? data.exerciseList.map((d)=>{

     return <TableRow >
      <TableCell align="left">{dateFormat(new Date(d.date),'yyyy-mm-dd h:M:ss')}</TableCell>
     <TableCell align="left">{d.weight}</TableCell>
     <TableCell align="left">{d.rep}</TableCell>

      </TableRow>
   }) : <p></p>}
   </TableBody>
   </Table>
   </TableContainer>
    </Paper>

       </Grid>


        </Box>
        <Box sx={{display:'flex', width:'50%'}}>
        <Box sx={{padding: '8px 16px' ,color:'#e0e0e0', textAlign:'left', width:'40%'}}>
        <Paper >
        <Typography variant={"h6"} align={"left"} ml={1}  pt={1.5} pl={1} sx={{color:'#7986cb', fontSize:'16px'}}>Highest Weight:</Typography>
        <Typography variant={"h6"} align={"left"} ml={1} mb={2} pt={1} pb={1} pl={1} sx={{color:'#7986cb', fontSize:'26px'}}>{data ? data.highest : ""}</Typography>
        </Paper>
        </Box>
        <Box sx={{padding: '8px 16px' ,color:'#e0e0e0', textAlign:'left', width:'50%'}}>
        <Paper >
        <Typography variant={"h6"} align={"left"} ml={1}  pt={1.5} pl={1} sx={{color:'#7986cb', fontSize:'16px'}}>Average Weight:</Typography>
        <Typography variant={"h6"} align={"left"} ml={1} mb={2} pt={1} pb={1} pl={1} sx={{color:'#7986cb', fontSize:'26px'}}>{data ? data.exerciseList.map((d)=>{return d.weight}).reduce((total, num)=>{return total+num},0)/data.exerciseList.length : ""}</Typography>
        </Paper>
        </Box>
        </Box>
       </Box>
       </Box>
    )


}

export default DetailPage;
