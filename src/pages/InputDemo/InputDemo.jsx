/* eslint-disable no-console */
import React from 'react';
import { TextField, RadioGroup, SelectField } from '../../components';
import { Text } from '../../components/TextField/style';
import { selectOptions, radioOptionsCricket, radioOptionsFootball } from '../../config/constants';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleSportChange = (e) => {
    if (e.target.value !== 'Select') {
      this.setState({ sport: e.target.value, football: '', cricket: '' });
    } else {
      this.setState({ sport: '', football: '', cricket: '' });
    }
  }

  handlePositionChange = (e) => {
    const { sport } = this.state;

    this.setState({ [sport]: e.target.value });
  }

  RadioOption = () => {
    const radioOptions = {
      cricket: radioOptionsCricket,
      football: radioOptionsFootball,
    };
    const { sport } = this.state;
    return radioOptions[sport];
  };

  render() {
    const { sport } = this.state;
    console.log(this.state);
    return (
      <>
        <div>

          <Text><p>Name</p></Text>
          <TextField
            onChange={this.handleNameChange}
          />

          <Text>
            <p>Select the game you play</p>
          </Text>
          <SelectField
            defaultOptions="Select"
            onChange={this.handleSportChange}
            options={selectOptions}
          />
          <div>
            {
              (sport) && (
                <>
                  <p><b>What you do?</b></p>
                  <RadioGroup
                    options={this.RadioOption()}
                    onChange={this.handlePositionChange}
                  />
                </>
              )
            }
          </div>

        </div>
      </>
    );
  }
}

export default InputDemo;
