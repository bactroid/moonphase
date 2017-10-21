import React from 'react'
import './PhaseInfo.css'

const makeNextPhasesString = obj =>
  obj.nextNew > obj.nextFull
    ? <div><div>Full Moon: {obj.nextFull.toString()}</div><div>New Moon: {obj.nextNew.toString()}</div></div>
    : <div><div>New Moon: {obj.nextNew.toString()}</div><div>Full Moon: {obj.nextFull.toString()}</div></div>

const PhaseInfo = ({phaseObj}) => {
  return (
    <div id='phaseinfo'>
      <div>{phaseObj.phaseText} ({phaseObj.illuminationPercent}%)</div>
      {makeNextPhasesString(phaseObj)}
    </div>
  )
}

export default PhaseInfo
