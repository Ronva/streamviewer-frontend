import { useContext } from 'react';
import { Context } from 'App';

export default ({ fallback = null, children }) => {
  const { token } = useContext(Context);
  return token ? children : fallback;
};
