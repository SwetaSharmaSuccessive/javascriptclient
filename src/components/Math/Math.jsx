import React from 'react';
import PropTypes from 'prop-types';

const Math = (props) => {
  const {
    first, second, operator, children,
  } = props;
  const operatorList = ['+', '-', '*', '/'];
  const calculateResult = () => {
    if (!operatorList.includes(operator)) {
      return 'Invalid Operation';
    }
    /* eslint-disable no-eval */
    return eval(`${first} ${operator} ${second}`);
  };
  if (children) {
    return children({ first, second, result: calculateResult() });
  }
  return (
    <p>
      {`Result of ${first} ${operator} ${second} is ${calculateResult()}`}
    </p>
  );
};
Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.node,
};
Math.defaultProps = {
  children: undefined,
};
export default Math;
