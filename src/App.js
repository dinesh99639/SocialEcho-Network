import ReduxPersist from './Store/ReduxPersist';

import Header from './Components/Header';

function App() {
  return (
    <ReduxPersist>
      <Header />
    </ReduxPersist>
  );
}

export default App;
