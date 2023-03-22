import ReduxPersist from './Store/ReduxPersist';

import Test from './Components/Test';

function App() {
  return (
    <ReduxPersist>
      <Test />
    </ReduxPersist>
  );
}

export default App;
