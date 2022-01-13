import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import dateFormat, { masks } from "dateformat";

const CellComp = ({e}) =>{

  const [open, setOpen] = React.useState(false);
  const data=e;
  const recent = e[0];
  const history = data.slice(1,e.length);
  const date = dateFormat(new Date(recent.date),'yyyy-mm-dd h:M:ss')

  console.log(history.length)

  return(<React.Fragment>
<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
<TableCell>
  <IconButton
    aria-label="expand row"
    size="small"
    onClick={() => setOpen(!open)}
  >
    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
  </IconButton>
</TableCell>
<TableCell align="left">{recent.name}</TableCell>
<TableCell align="left">{recent.weight}</TableCell>
<TableCell align="left">{recent.rep}</TableCell>
<TableCell align="left">{date}</TableCell>

</TableRow>
<TableRow>
<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
<Collapse in={open} timeout="auto" unmountOnExit>
           <Box sx={{ margin: 1 }}>
             <Typography variant="h6" gutterBottom >
               Sets
             </Typography>
{history && history.length>0 ?              <Table size="small" >
               <TableHead>
                 <TableRow >
                   <TableCell>Weight</TableCell>
                   <TableCell>Reps</TableCell>
                   <TableCell align="right">Date</TableCell>

                 </TableRow>
               </TableHead>
               <TableBody>
                 {history.map((historyRow) => (
                   <TableRow key={historyRow.weight} >
                     <TableCell scope="row ">
                       {historyRow.weight}
                     </TableCell>
                     <TableCell >{historyRow.rep}</TableCell>
                     <TableCell align="right">{dateFormat(new Date(historyRow.date),'yyyy-mm-dd h:M:ss')}</TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table> : <Typography>No Data Available</Typography>}
           </Box>
         </Collapse>
</TableCell>
</TableRow>
</React.Fragment>
  )
}

export default CellComp;
