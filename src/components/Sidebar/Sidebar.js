import React from 'react';
import {
     BrowserRouter as Router,
     Routes,
     Route,
     Link,
     Redirect
   } from 'react-router-dom';
// components
import Home from '../Home/Homee';
import CreateCFT from '../Create/CreateCFT';
import CreateBid from '../Create/CreateBid';
import CFTList from '../CFTList/CFTList';
import Dashboard from '../Dashboard/Dashboard';
import CreateAR from '../Create/CreateAR';
import ARL from '../CFTList/ARL';
// @MUI
import { Collapse, Button,ListItemIcon, IconButton, SwipeableDrawer, Stack, Grid, List, ListItem, ListItemText, Divider, Typography} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// style
import '../../App.css';
import logo from './logo.png';

export default function Sidebar() {
     const [state, setState] = React.useState(false);
      
     const toggleDrawer = (open) => (event) => {
          if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
          ) {
            return;
         }
      
        setState(open);
     };

     const [openDashboard, setOpenDashboard] = React.useState(true);

     const handleClick = () => {
       setOpenDashboard(!openDashboard);
     };
     
     return (
          <Grid container className="container">
          <Router>
               <Grid item md={3} className="background" sx={{ display: {  xs: 'none', md: 'block' } }}>
               <Stack direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                              <Link to="/">
                                   <img className="logo" src={logo} alt='logo'/>
                              </Link>
                    <Stack direction="row"
                         justifyContent="center"
                         alignItems="center"
                         spacing={2} p={2}>
                         <Link className="link" to="/createCFT">
                              <Button  variant="contained" color="success" startIcon={<AddCircleIcon />}>
                              CFT
                              </Button>
                         </Link>
                         <Link className="link" to="/createBid">
                         <Button variant="contained" color="success" startIcon={<AddCircleIcon />}>
                              Bid
                         </Button>
                         </Link>
                    </Stack>
                    <List className="list" component="nav" aria-label="mailbox folders">
                         <Link className="link" to="/cftList">
                              <ListItem button>
                                   <ListItemIcon>
                                        <CampaignIcon />
                                   </ListItemIcon>
                                   <ListItemText primary="View current CFTs" className="listItemText"/>
                              </ListItem>
                         </Link>
                         <Divider />
                         <ListItem button divider onClick={handleClick}>
                              <ListItemIcon>
                                   <DashboardIcon />
                              </ListItemIcon>
                              <ListItemText primary="View Dashboard" className="listItemText"/>
                              {openDashboard ? <ExpandLess style={{color: 'rgb(132,133,140)' }}/> : <ExpandMore style={{color: 'rgb(132,133,140)' }}/>}
                         </ListItem>
                         <Collapse in={openDashboard} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                   <Link className="link" to="/dashboard">
                                        <ListItem button style={{color: 'rgb(132,133,140)' }}>
                                             <ListItemText primary="mFRR" />
                                        </ListItem>
                                   </Link>
                                   <Link className="link" to="/dashboard">
                                        <ListItem button style={{color: 'rgb(132,133,140)' }}>
                                             <ListItemText primary="aFRR" />
                                        </ListItem>
                                   </Link>
                              </List>
                         </Collapse>
                    </List>
               </Stack>
               </Grid>
               <Grid item md={3} className="background" sx={{ display: {  xs: 'block', md: 'none' } }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                         <Grid item>
                              <Link to="/">
                                   <img className="logo-drawer" src={logo} alt='logo'/>
                              </Link>
                         </Grid>
                         <Grid item>
                              <IconButton onClick={toggleDrawer(true)}>
                                   <FormatListBulletedIcon className="drawer-button"/>
                              </IconButton>
                         </Grid>
                    </Grid>
                    <SwipeableDrawer

                         open={state}
                         onClose={toggleDrawer(false)}
                         onOpen={toggleDrawer(true)}
                    >   
                         <Stack direction="column"
                              justifyContent="center"
                              alignItems="center"
                              spacing={2} p={2}>
                              <Link className="link" to="/createCFT">
                                   <Button  variant="contained" color="success" startIcon={<AddCircleIcon />}>
                                   CFT
                                   </Button>
                              </Link>
                              <Link className="link" to="/createBid">
                                   <Button variant="contained" color="success" startIcon={<AddCircleIcon />}>
                                        Bid
                                   </Button>
                              </Link>
                         </Stack>
                         <List className="list" component="nav" aria-label="mailbox folders">
                              <Link className="link" to="/cftList">
                                   <ListItem button>
                                        <ListItemText primary="View current CFTs" className="listItemText"/>
                                   </ListItem>
                              </Link>
                              <Divider />
                              <Link className="link" to="/dashboard">
                                   <ListItem button divider>
                                        <ListItemText primary="View Dashboard" className="listItemText"/>
                                   </ListItem>
                              </Link>
                         </List>
                    </SwipeableDrawer>
               </Grid>
               <Grid item md={9}>
                    <Routes>
                         <Route exact path="/" element={<Home/>}/>
                         <Route exact path="/createCFT" element={<CreateCFT/>}/>
                         <Route exact path="/createBid" element={<CreateBid/>}/>
                         <Route exact path="/cftList" element={<CFTList/>}/>
                         <Route exact path="/dashboard" element={<Dashboard/>}/>
                         <Route exact path="/createAR" element={<CreateAR/>}/>
                         <Route exact path="/ARL" element={<ARL/>}/>
                         <Route
                              path="*"
                              element={
                              <div>
                                   <h2>404 Page not found</h2>
                              </div>
                              }
                         />
                    </Routes>
               </Grid>
          </Router>
          </Grid>
     );
}