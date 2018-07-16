import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import SentenceScramblerUtil from "../utils/SentenceScramblerUtil";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Refresh from "@material-ui/icons/Refresh";
import ScramblerOptions from "./ScramblerOptions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class SentenceScrambler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: null,
      outputString: null,
      canScramble: false,
      options: {
        shouldTokenizeQuestionMarks: false,
        shouldStripFullStops: false
      }
    };

    this.updateOutputString = this.updateOutputString.bind(this);
    this.onRescramble = this.onRescramble.bind(this);
    this.canRescramble = this.canRescramble.bind(this);
    this.optionsCallback = this.optionsCallback.bind(this);
    this.onOptionsChanged = this.onOptionsChanged.bind(this);

    this.onOptionsChanged();
  }

  updateOutputString(event) {
    const updatedInputString = event.target.value;
    let updatedOutputString = updatedInputString;
    if (this.scrambler.canScramble(updatedInputString)) {
      const scrambledWords = this.scrambler.scrambleSentence(
        updatedInputString
      );
      updatedOutputString = scrambledWords.join(" / ");
    }
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
    if (
      this.state.inputString.endsWith(".") &&
      this.state.options.shouldStripFullStops
    ) {
      updatedOutputString = updatedOutputString + " .";
    }
    this.setState({ outputString: updatedOutputString });
  }

  canRescramble() {
    if (!this.state.inputString) return false;

    return this.scrambler.canScramble(this.state.inputString);
  }

  optionsCallback(option, value) {
    let newOptions = this.state.options;
    newOptions[option] = value;
    this.setState({ options: newOptions });
    this.onOptionsChanged();
    this.onRescramble();
  }

  onOptionsChanged() {
    this.scrambler = new SentenceScramblerUtil(this.state.options);
  }

  render() {
    return (
      <div>
        <TextField
          id="sentenceInput"
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
        <ScramblerOptions
          options={this.state.options}
          optionsCallback={this.optionsCallback}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SentenceScrambler);
