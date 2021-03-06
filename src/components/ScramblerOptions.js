import React, { Component } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class ScramblerOptions extends Component {
  handleChange(optionName) {
    return event => {
      this.props.optionsCallback(optionName, event.target.checked);
    };
  }

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Options</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.options["shouldTokenizeQuestionMarks"]}
                onChange={this.handleChange("shouldTokenizeQuestionMarks")}
                value="shouldTokenizeQuestionMarks"
                disabled={this.props.options["shouldUseExplicitSeparators"]}
              />
            }
            label="Make question mark a separate word"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.options["shouldStripFullStops"]}
                onChange={this.handleChange("shouldStripFullStops")}
                value="shouldStripFullStops"
                disabled={this.props.options["shouldUseExplicitSeparators"]}
              />
            }
            label="Should Strip Full Stops"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.options["shouldUseExplicitSeparators"]}
                onChange={this.handleChange("shouldUseExplicitSeparators")}
                value="shouldUseExplicitSeparators"
              />
            }
            label="Should use &quot;/&quot; as Separator"
          />
        </FormGroup>
      </FormControl>
    );
  }
}

export default ScramblerOptions;
