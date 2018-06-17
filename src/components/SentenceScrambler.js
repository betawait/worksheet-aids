import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import SentenceScramblerUtil from "../utils/SentenceScramblerUtil";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Refresh from "@material-ui/icons/Refresh";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class SentenceScrambler extends Component {
  constructor(props) {
    super(props);
    this.scrambler = new SentenceScramblerUtil();
    this.state = {
      inputString: null,
      outputString: null,
      canScramble: false
    };
    this.updateOutputString = this.updateOutputString.bind(this);
    this.onRescramble = this.onRescramble.bind(this);
    this.canRescramble = this.canRescramble.bind(this);
  }

  updateOutputString(event) {
    const updatedInputString = event.target.value;
    const scrambledWords = this.scrambler.scrambleSentence(updatedInputString);
    let updatedOutputString = scrambledWords.join(" / ");
    this.setState({
      inputString: updatedInputString,
      outputString: updatedOutputString
    });
  }

  onRescramble() {
    if (!this.state.inputString) return;

    const scrambledWords = this.scrambler.scrambleSentence(
      this.state.inputString
    );
    let updatedOutputString = scrambledWords.join(" / ");
    this.setState({ outputString: updatedOutputString });
  }

  canRescramble() {
    if (!this.state.inputString) return false;

    return this.scrambler.canScramble(this.state.inputString);
  }

  render() {
    return (
      <div>
        <TextField
          id="full-width"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Write something here!"
          fullWidth
          margin="normal"
          onChange={this.updateOutputString}
        />
        <div>
          {this.state.outputString}
          <IconButton
            color="secondary"
            aria-label="Rescramble Sentence"
            className={this.props.button}
            disabled={!this.canRescramble()}
            onClick={this.onRescramble}
          >
            <Refresh />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SentenceScrambler);
