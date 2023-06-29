import { getSurveyServiceList } from '@/services/survey';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';

function useSurveyListData() {
  const [searchParams] = useSearchParams();
  const {
    data = {},
    loading,
    error,
    refresh,
  } = useRequest(
    async () => {
      const data = await getSurveyServiceList({
        keyword: searchParams.get('keyword') || '',
        page: searchParams.get('page') || '1',
        pageSize: searchParams.get('pageSize') || '10',
      });
      return data;
    },
    {
      refreshDeps: [searchParams], // 刷新的依赖项
    }
  );
  return { data, loading, error, refresh };
}

export default useSurveyListData;
