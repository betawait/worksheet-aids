import React, { Component } from 'react';

import SentenceScrambler from './components/SentenceScrambler'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class App extends Component { 
  constructor(props) {
    super(props)
    this.classes = props;
  }

  styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  });
  
  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Worksheet Aids
            </Typography>
          </Toolbar>
        </AppBar>
        <ExpansionPanel defaultExpanded={true} >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={this.classes.heading}>Sentence Scrambler</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <SentenceScrambler/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
    );
  }
}

export default App;
