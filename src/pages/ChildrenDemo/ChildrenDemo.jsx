import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { Math } from '../../components/Math';
import Theme from '../../theme';

const ChildrenDemo = () => (
  <>
    <ThemeProvider theme={Theme} />
    <Math
      first={77}
      second={33}
      operator="*"
    >
      {
        (item) => (
          <p>
            {' '}
            Multiplication of
            {' '}
            {item.first}
            {' '}
            and
            {' '}
            {item.second}
            {' '}
            is
            {' '}
            {item.result}
          </p>
        )
      }
    </Math>
    <Math first={465} second={632} operator="+">
      {
        (item) => (
          <p>
            When we add
            {' '}
            {item.first}
            {' '}
            and
            {' '}
            {item.second}
            {' '}
            we get
            {' '}
            {item.result}
          </p>
        )
      }
    </Math>
    <Math first={465} second={632} operator="-">
      {
        (item) => (
          <p>
            When we add
            {' '}
            {item.first}
            {' '}
            and
            {' '}
            {item.second}
            {' '}
            we get
            {' '}
            {item.result}
          </p>
        )
      }
    </Math>
    <Math first={5} second={0} operator="/">
      {
        (item) => (
          <p>
            When we divide
            {' '}
            {item.first}
            {' '}
            and
            {' '}
            {item.second}
            {' '}
            we get
            {' '}
            {item.result}
          </p>
        )
      }
    </Math>
    <Math first={765} second={76} operator="?">
      {
        (item) => (
          <p>
            When we perform (?)
            {' '}
            {item.first}
            {' '}
            &
            {' '}
            {item.second}
            {' '}
            we get
            {' '}
            {item.result}
          </p>
        )
      }
    </Math>
    <Math
      first={298}
      second={384}
      operator="+"
    />
  </>
);
export default ChildrenDemo;
