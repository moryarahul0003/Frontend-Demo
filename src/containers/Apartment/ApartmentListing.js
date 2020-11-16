import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Visibility from "@material-ui/icons/Visibility"; 
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// import {history} from "../../store/index";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';


// Table Ordering
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Table sorting
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// table column headers
const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'floorLevel', numeric: true, disablePadding: false, label: 'Floor Level' },
  { id: 'numberOfRooms', numeric: true, disablePadding: false, label: 'No Of Rooms' },
  { id: 'petsAllowed', numeric: true, disablePadding: false, label: 'Pets Allowed' },
  { id: 'floorLevel', numeric: true, disablePadding: false, label: 'Floor level' },
  { id: 'isActive', numeric: true, disablePadding: false, label: 'Is Active' },
];

// table head enhancements
function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  debugger
  const classes = useToolbarStyles();
  const { numSelected,nameSelected,tableViewHandler } = props;
  const [wantViewApartment, setWantViewApartment] = React.useState(false);


  const eyeClickHandler = () => {
    debugger
    setWantViewApartment(!wantViewApartment);
    tableViewHandler();
  }
  return (
    <>

    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected,
      })}
    >
    {numSelected ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            The Apartmnet {nameSelected} has been selected.
        </Typography>
        ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            
        </Typography>
    )}

    {numSelected ? (
            <>
            <Tooltip title="view">
                <IconButton aria-label="view" onClick={eyeClickHandler}>
                  {wantViewApartment?(
                      <Visibility />
                  ):(
                    <VisibilityOff/>
                  )}
                </IconButton>
            </Tooltip>
            </>
    
        ) : (
            <></>
    )}
     
    </Toolbar>
    
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const useDetailStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const useCardStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function EnhancedTable(props) {
  const classes = useStyles();
  const detailClasses = useDetailStyles()
  const cardClasses = useCardStyles()
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState();
  const [seletedName,setSeletedName] = React.useState();
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [hideTable,setHideTable] = useState(false);
  const [selectedDetails,setSelectedDetails] = useState({})

  const apartmentList = useSelector(state=>state.app.apartmentListingData);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event,row) => {
    debugger
    setSelectedDetails(row);
    if(selected === row.id ){
      setSelected(null);
    }else{
      setSelected(row.id);
      setSeletedName(row.name);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected === id;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, apartmentList.length - page * rowsPerPage);

  return (
    <>
    <div className={classes.root}>
  
       <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected} nameSelected={seletedName} tableViewHandler={()=>setHideTable(!hideTable)} />
        {!hideTable && (
          <>
           <Paper className={classes.paper}>
           <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={apartmentList.length}
            />
            <TableBody>
              {stableSort(apartmentList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event,row)}
                      role="radio"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.floorLevel}</TableCell>
                      <TableCell align="right">{row.numberOfRooms}</TableCell>
                      <TableCell align="right">{row.petsAllowed?"Yes":"No"}</TableCell>
                      <TableCell align="right">{row.floorLevel}</TableCell>
                      <TableCell align="right">{row.isActive?"Yes":"No"}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={apartmentList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
           </Paper>
          </>
        )}
      </Paper>
      {!hideTable &&(
        <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label={dense?"expand table":"squeez table"}
        />
      )}
      {hideTable &&(
        <>

           <div className={detailClasses.root}>
           <Grid container spacing={3}>
           <Grid item xs={6}>
               <Paper className={detailClasses.paper}>
               <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Basic details
                      </Typography>
                      <ul className="evs-ul-userdetails">
                        <li title="Name">
                          <div> Name: </div>
                          <div>{selectedDetails.name}</div>
                        </li>
                        <li title="Description">
                          <div> Description: </div> <div>{selectedDetails.description} </div>
                        </li>
                      </ul>
                      
                    </CardContent>
                  </CardActionArea>
              </Card>
               </Paper>
             </Grid>
             <Grid item xs={6}>
               <Paper className={detailClasses.paper}>
               <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Occupancy
                      </Typography>
                      <ul className="evs-ul-userdetails">
                        <li title=" Occupacy Min Value">
                          <div> Occupacy Min Value: </div>
                        <div>{selectedDetails.occupancy.minValue}</div>
                        </li>
                        <li title="Occupacy Max Value">
                          <div> Occupacy Max Value:</div>
                        <div>{selectedDetails.occupancy.maxValue}</div>
                        </li>
                    </ul>
                    </CardContent>
                  </CardActionArea>
              </Card>
               </Paper>
             </Grid>

              <Grid item xs={6}>
               <Paper className={detailClasses.paper}>
               <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Floor Description
                      </Typography>
                      <ul className="evs-ul-userdetails">
                        <li title="Floor level">
                          <div>Floor level: </div>
                        <div>{selectedDetails.floorLevel}</div>
                        </li>
                        <li title="Floor Size">
                          <div> Floor Size:</div>
                        <div>{selectedDetails.floorSize.value}</div>
                        </li>
                        <li title="Floor Size Unit code">
                          <div> Floor Size Unit code:</div>
                        <div>{selectedDetails.floorSize.unitCode}</div>
                        </li>
                    </ul>
                    </CardContent>
                  </CardActionArea>
              </Card>
               </Paper>
             </Grid>

             <Grid item xs={6}>
               <Paper className={detailClasses.paper}>
               <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Architectural Information
                      </Typography>
                      <ul className="evs-ul-userdetails">
                        <li title="No of Bedroom">
                          <div> No of Bedroom: </div>
                        <div>{selectedDetails.numberOfBedrooms}</div>
                        </li>
                        <li title="No of Bathrooms">
                          <div>No of Bathrooms:</div>
                        <div>{selectedDetails.numberOfBathroomsTotal}</div>
                        </li>
                        <li title="Year Built">
                          <div>Year Built:</div>
                        <div>{selectedDetails.yearBuilt}</div>
                        </li>
                    </ul>
                    </CardContent>
                  </CardActionArea>
              </Card>
               </Paper>
             </Grid>
             <Grid item xs={6}>
               <Paper className={detailClasses.paper}>
               <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Location & geographical Information
                      </Typography>
                      <ul className="evs-ul-userdetails">
                        <li title="street Address">
                          <div>street Address: </div>
                        <div>{selectedDetails.address.addressCountry}</div>
                        </li>
                        <li title="Locality">
                          <div>Locality:</div>
                        <div>{selectedDetails.address.addressLocality}</div>
                        </li>
                        <li title="Address Region">
                          <div>Address Region:</div>
                        <div>{selectedDetails.address.addressRegion}</div>
                        </li>
                        <li title="Address Country">
                          <div>Address Country:</div>
                        <div>{selectedDetails.address.addressCountry}</div>
                        </li>
                        <li title="Address Country">
                          <div>Latitude:</div>
                        <div>{selectedDetails.latitude}</div>
                        </li>
                        <li title="Address Country">
                          <div>Longitude:</div>
                        <div>{selectedDetails.longitude}</div>
                        </li>
                    </ul>
                    </CardContent>
                  </CardActionArea>
              </Card>
               </Paper>
             </Grid>

             <Grid item xs={6}>
               <Paper className={detailClasses.paper}>
               <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Contact 
                      </Typography>
                      <ul className="evs-ul-userdetails">
                        <li title="Number of Trading Account">
                          <div> Contact: </div>
                        <div>{selectedDetails.telephone}</div>
                        </li>
                    </ul>
                    </CardContent>
                  </CardActionArea>
              </Card>
               </Paper>
             </Grid>
           </Grid>
         </div>
    </>
    )}
    </div>
    </>
  );
}
