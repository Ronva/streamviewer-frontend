import React, { useContext } from 'react';
import { Context } from 'App';

export default () => {
  const { stream } = useContext(Context);
  const { stats } = stream;
  return (
    <>
      <h3 className="title">Statistics</h3>
      <section className="stats">
        {Object.entries(stats).map(([label, info]) => (
          <div key={label} className="item">
            <label>{label}:</label> {info}
          </div>
        ))}
      </section>
    </>
  );
};
