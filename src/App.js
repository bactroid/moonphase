import React, {Component} from 'react'
import PhaseInfo from './PhaseInfo'
import './App.css'

const moonphase = require('./moonphase')

class App extends Component {
  constructor () {
    super()
    this.state = moonphase.getPhaseInfo()
  }
  render () {
    return (
      <div className='App'>
        <PhaseInfo phaseObj={this.state} />
      </div>
    )
  }
}

export default App
