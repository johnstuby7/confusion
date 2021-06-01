import React from 'react';

// fa-3x will make it spin 3x as fast
// fa-fw will make the spinner spin in the forward direction
export const Loading = () => {
  return(
    <div className="col-12">
      <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary "></span>
      <p>Loading . . . </p>
    </div>
  )
};
