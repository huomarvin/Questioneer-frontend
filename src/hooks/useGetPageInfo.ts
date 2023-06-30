import { useSelector } from 'react-redux';
import type { StateType } from '../store';
import type { PageInfoType } from '@/store/pageInfoReducer';

function useGetPageInfo() {
  const pageInfo = useSelector<StateType, PageInfoType>(state => state.pageInfo);
  return pageInfo;
}

export default useGetPageInfo;
