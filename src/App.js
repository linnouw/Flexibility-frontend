import React from 'react';
// @MUI
import {Grid} from '@mui/material';
// components
import Sidebar from './components/Sidebar/Sidebar';
// style
import './App.css';

export default function App() {
  return (
      <Grid className="minHeight">
        <Sidebar />
    </Grid>
  );
}
