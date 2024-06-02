import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthProvider';
import Fetcher from '../../fetcher';
import MyButton from './MyButton';

function DeleteButton({ baseRoute = "api", subRoutes, updateFn, text = "Delete", cssType = "error" }) {
  const { userId } = useContext(AuthContext);

  const onClick = async (e) => {
    const fetcher = new Fetcher(baseRoute);
    await fetcher.route(subRoutes).setToken(userId.accessToken).delete();

    if (updateFn instanceof Function) updateFn();
  }

  return <MyButton {...{ text, cssType, onClick }} />
}

export default DeleteButton;