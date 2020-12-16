import React, { Component } from 'react';
import { Math } from '../../components/Math';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Math first={7} second={4} operator="+" />
        <br />
        <Math first={6} second={1} operator="-" />
        <br />
        <Math first={50} second={2} operator="*" />
        <br />
        <Math first={44} second={4} operator="/" />
        <br />
        <Math first={7} second={0} operator="/" />
        <br />
        <Math first={3} second={0} operator="^" />
        <br />
        <Math first={10} second={90} operator="+">
          {(first, second, operator, result) => (
            <div>{`Sum of ${first} and ${second} is ${result}`}</div>
          )}
        </Math>
        <br />
        <Math first={13} second={9} operator="-">
          {(first, second, operator, result) => (
            <div>{`Difference of ${first} and ${second} is ${result}.`}</div>
          )}
        </Math>
        <br />
        <Math first={500} second={0} operator="*">
          {(first, second, operator, result) => (
            <div>{`When we multiply ${first} with ${second} then we get ${result} as a result.`}</div>
          )}
        </Math>
        <br />
        <Math first={30} second={0} operator="^">
          {(first, second, operator, result) => (
            <div>{`${first} ${operator} ${second} is an ${result}.`}</div>
          )}
        </Math>

        <br />
        <Math first={75} second={0} operator="/">
          {(first, second, operator, result) => (
            <div>{`When we divide ${first} with ${second} then we get ${result} as a result.`}</div>
          )}
        </Math>
        <br />
        <Math first={555} second={5} operator="/">
          {(first, second, operator, result) => (
            <div>{`When we divide ${first} and ${second} we get ${result}`}</div>
          )}
        </Math>
      </>
    );
  }
}
export default ChildrenDemo;
