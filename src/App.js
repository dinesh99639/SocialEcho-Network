import ReduxPersist from './Store/ReduxPersist';

import Header from './Components/Header';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <ReduxPersist>
      <Header />
      <Dashboard />
    </ReduxPersist>
  );
}

export default App;
