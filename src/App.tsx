import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import {PostsManager} from './components/PostsManager';
import {Box} from '@mui/material';

function App() {
  return (
      <Box>
        <Switch>
          <Route path="/" component={PostsManager}/>
        </Switch>
      </Box>
  );
}

export default App;
