import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import SentenceScramblerUtil from '../utils/SentenceScramblerUtil';

class SentenceScrambler extends Component {
  constructor(props) {
    super(props);
    this.scrambler = new SentenceScramblerUtil();
    this.state = {
      inputString: null,
      outputString: null,
    };
    this.updateOutputString = this.updateOutputString.bind(this);
  }

  updateOutputString(event) {
    const updatedInputString = event.target.value;
    const scrambledWords = this.scrambler.scrambleSentence(updatedInputString)
    let updatedOutputString = scrambledWords.join(" / ");
    this.setState({inputString: updatedInputString, outputString: updatedOutputString});
  }

  render() {
    return (
        <div>
          <TextField
          id="full-width"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Write something here!"
          fullWidth
          margin="normal"
          onChange={this.updateOutputString}
        />

          <div>{this.state.outputString}</div>
        </div>
    );
  }

}

export default SentenceScrambler;
