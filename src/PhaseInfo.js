import React from 'react'
import Typography from 'material-ui/Typography'
import './PhaseInfo.css'

const makeNextPhasesString = obj =>
  obj.nextNew > obj.nextFull
    ? <div><div><Typography type='subheading'>Full Moon:</Typography> {obj.nextFull.toString()}</div><div><Typography type='subheading'>New Moon:</Typography> {obj.nextNew.toString()}</div></div>
    : <div><div><Typography type='subheading'>New Moon:</Typography> {obj.nextNew.toString()}</div><div><Typography type='subheading'>Full Moon:</Typography> {obj.nextFull.toString()}</div></div>

const PhaseInfo = ({phaseObj}) => {
  return (
    <div id='phaseinfo'>
      <Typography type='title'>{phaseObj.phaseText} ({phaseObj.illuminationPercent}%)</Typography>
      {makeNextPhasesString(phaseObj)}
    </div>
  )
}

export default PhaseInfo
