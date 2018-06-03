import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class SentenceScrambler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: null,
      outputString: null,
    };
    this.updateOutputString = this.updateOutputString.bind(this);

  }

  updateOutputString(event) {
    let updatedInputString = event.target.value;
    let sanitizedInputString = this.sanitizeInput(updatedInputString)
    let words = sanitizedInputString.split(" ");
    this.shuffleArray(words)
    const sanitizedWords = this.maybeLowercaseWordsInArray(words)
    let updatedOutputString = sanitizedWords.join(" / ");
    this.setState({inputString: updatedInputString, outputString: updatedOutputString});
  }

  //from comments on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/25984542
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
  }

  maybeLowercaseWordsInArray(array) {
    return array.map(aWord => {
      if(aWord.length > 1){
        return aWord.toLowerCase();
      } else if (aWord.length === 1 && aWord !== "I") {
        return aWord.toLowerCase();
      } else {
        return aWord;
      }
    })
  }

  sanitizeInput(inputString) {
    return inputString.trim()//.replace("?","").replace(".","")
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
