import { useContext } from 'react';
import { Context } from 'App';

export default ({ fallback = null, children }) => {
  const { user } = useContext(Context);
  return user ? children : fallback;
};
