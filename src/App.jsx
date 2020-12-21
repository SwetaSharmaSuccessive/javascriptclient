import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Trainee } from './pages/Trainee';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <ChildrenDemo /> */}
      <Trainee />
    </ThemeProvider>
  );
}

export default App;
