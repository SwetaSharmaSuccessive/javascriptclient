import React from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components/Math';

const ChildrenDemo = () => (
  <>
    <Math first={156} second={234} operator="+" />
    <Math first={14} second={2} operator="-" />
    <Math first={-11} second={2} operator="*" />
    <Math first={16.9} second={2} operator="/" />
    <Math first={28} second={3} operator="^" />
    <Math first={91} second={63} operator="*">
      {
        (item) => (
          <p>{`Multiplication of ${item.first} and ${item.second} is ${item.result}`}</p>
        )
      }
    </Math>
    <Math first={4} second={0} operator="/">
      {
        (item) => (
          <Typography variant="h6">{`When we divide ${item.first} & ${item.second} we get ${item.result}`}</Typography>
        )
      }
    </Math>
  </>
);
export default ChildrenDemo;
