import { useContext } from 'react';
import { Context } from 'App';

export default ({ fallback = null, children }) => {
  const { googleToken } = useContext(Context);
  return googleToken ? children : fallback;
};
