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

const ExerciseCard = ({data, setType, setOpen, type})=>{

const dat={};

data.forEach((d)=>{

if(!dat[d.name]){
  dat[d.name]=[d]
}else{
  dat[d.name].push(d)
}

})

const capitalize = (inp) =>{
  let res = inp.split('');
  res[0]=res[0].toUpperCase();
  return res.join('');
}

  return <Grid item xs={12} xl={6} md={12} pt={2} >
       <Paper><Typography variant={"h6"} align={"left"} ml={1} mb={1.5} pt={1.5} pl={1} sx={{color:'#7986cb', fontSize:'16px'}}>{capitalize(type)}</Typography>

             <TableContainer >
                 <Table aria-label="collapsible table">
                 <TableHead sx={{backgroundColor:'#ec407a'}}>
         <TableRow>
           <TableCell/>
           <TableCell align="left">Name</TableCell>
           <TableCell align="left">Max Weight</TableCell>
           <TableCell align="left">Reps</TableCell>
           <TableCell align="left">Date</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
        {Array.from(Object.keys(dat)).map((e)=>{
          return (<CellComp e={dat[e]}/>)
        })}
       </TableBody>
       </Table>
       </TableContainer>
       <div className='plusSign-div'>
       <AddCircleRoundedIcon  className='plusSign' onClick={()=>{
         setType(type);
         setOpen(true);

       }}/>
       </div>

       </Paper>
     </Grid>
}


export default ExerciseCard;
