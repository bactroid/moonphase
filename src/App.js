import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
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
      <MuiThemeProvider>
        <div className='App'>
          <AppBar title={'MoonPhase'} />
          <PhaseInfo phaseObj={this.state} />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
