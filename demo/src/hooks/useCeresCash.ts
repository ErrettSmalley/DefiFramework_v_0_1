import { useContext } from 'react';
import { Context } from '../contexts/CashProvider';

const useCeresCash = () => {
  const { ceresCash } = useContext(Context);
  return ceresCash;
};

export default useCeresCash;
