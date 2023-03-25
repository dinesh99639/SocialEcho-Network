import ReduxPersist from './Store/ReduxPersist';
import SnackBar from './Contexts/Snackbar';

import Header from './Components/Header';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <ReduxPersist>
      <SnackBar>
        <Header />
        <Dashboard />
      </SnackBar>
    </ReduxPersist>
  );
}

export default App;
