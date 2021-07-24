import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from 'react-bootstrap/ProgressBar';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function ProgressBarResult({ score }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProgressBar 
      label={`${score}%`} 
      style={{ margin: '0px 10px 25px' }} 
      variant="success" 
      now={score}
      />
      {/* <p style={{ marginLeft: '10px', fontSize: '0.8em', fontStyle: 'italic', color: 'blue' }}>Match: {score}%</p> */}
    </div>
  );
}