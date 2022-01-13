import React, {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import ClickAwayListener from '@mui/material/ClickAwayListener';

const AddForm=({type, exc, clickaway, refresh})=>{

const [weight, setWeight] = useState('0');
const [reps, setReps] = useState('0');
const [getexc, setGetExc] = useState(Array.from(new Set(exc.map((e)=>{return e.name})))[0]);
const [exList, setExlist] = useState(new Set(exc.map((e)=>{return e.name})));
const [addNew, setAddNew]=useState(exc.length ? false : true);

const capitalize = (inp) =>{
  let res = inp.split('');
  res[0]=res[0].toUpperCase();
  return res.join('');
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  const fetchData = await fetch('http://localhost:8080/addExercise',{
    method:'POST',
    headers:{
      "Content-Type" : "application/json",
      "Authorization" : 'Bearer '+window.localStorage.token
    },
    body:JSON.stringify({user:"kiki",name:getexc,muscle:capitalize(type),weight:weight,rep:reps})
  })

const status = await fetchData.status;

if(status == 200){
  refresh();
  clickaway();
}
}

return (

  <Box sx={{backgroundColor:'white', color:'black', padding:'15px', borderTop:'10px solid #7986cb'}}>
  <Typography sx={{paddingTop:'5px', marginBottom:'5px'}}> Add new {type} exercise </Typography>
  <Divider sx={{marginBottom:'20px',marginTop:'15px'}}/>
    <form className='addForm'
  onSubmit={(e)=>{handleSubmit(e)

  }}
    >

    <FormControl >

  { addNew  ?  <TextField
         id="weight"
         label="Exercise"
         sx={{margin:'5px'}}
         onInput={(e)=>{setGetExc(e.target.value)}}
         /> :   <React.Fragment><InputLabel id="demo-simple-select-label">Exercise</InputLabel>
         <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={getexc}
        label="Exercise"
        align={"left"}
        sx={{margin:'5px'}}
        onChange={(e)=>{setGetExc(e.target.value)}}
      >

      {Array.from(exList).map((e)=>{return <MenuItem value={e}>{e}</MenuItem>})}
      <MenuItem value={'new'} onClick={()=>{setAddNew(true)}}>New Exercise</MenuItem>

      </Select></React.Fragment>}
      </FormControl>

      <TextField
           id="weight"
           label="Weight"
           type='number'
           defaultValue={weight}
           sx={{margin:'5px'}}
           onInput={(e)=>{setWeight(e.target.value)}}

         />
         <TextField
              id="reps"
              label="Reps"
              type='number'
              defaultValue={reps}
              sx={{margin:'5px'}}
              onInput={(e)=>{setReps(e.target.value)}}
            />
          <Button variant="contained" type={"submit"}  sx={{marginLeft:'5px'}}>Submit</Button>

    </form>

  </Box>

)

}

export default AddForm;
