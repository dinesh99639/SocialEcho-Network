import { connect } from 'react-redux';

import DatabaseSlice from '../Store/Reducers/database';

function Test(props) {
  console.log(props);

  return (
    <>
      <button onClick={() => props.incrementByValue(10)}>increment +10</button>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  incrementByValue: DatabaseSlice.actions.incrementByValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
