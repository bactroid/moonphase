import React from 'react'
import Typography from 'material-ui/Typography'
import List, {ListItem, ListItemText} from 'material-ui/List'
import './PhaseInfo.css'

const makeNextPhasesString = obj =>
  obj.nextNew > obj.nextFull
    ? <List><ListItem button><ListItemText primary='Full Moon:' secondary={obj.nextFull.toString()} /></ListItem><ListItem button><ListItemText primary='New Moon:' secondary={obj.nextNew.toString()} /></ListItem></List>
    : <List><ListItem button><ListItemText primary='New Moon:' secondary={obj.nextNew.toString()} /></ListItem><ListItem button><ListItemText primary='Full Moon:' secondary={obj.nextFull.toString()} /></ListItem></List>

const PhaseInfo = ({phaseObj}) => {
  return (
    <div id='phaseinfo'>
      <Typography type='headline'>{phaseObj.phaseText} ({phaseObj.illuminationPercent}%)</Typography>
      {makeNextPhasesString(phaseObj)}
    </div>
  )
}

export default PhaseInfo
