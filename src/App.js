import ReduxPersist from './Store/ReduxPersist';

import Test from './Components/Test';
import Header from './Components/Header';

function App() {
  return (
    <ReduxPersist>
      <Header />

      {/* <Test /> */}
    </ReduxPersist>
  );
}

export default App;
