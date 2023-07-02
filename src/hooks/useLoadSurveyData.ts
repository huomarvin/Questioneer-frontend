import { getSurveyService } from '@/services/survey';
import { resetPageInfo } from '@/store/pageInfoReducer';
import { resetComponents } from '@/store/surveyReducer';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function useLoadSurveyData() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷id');
      const data = await getSurveyService(id);
      return data;
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (!data) return;
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
      componentList = [],
    } = data;

    // 获取默认的 selectedId
    let selectedId = '';
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id; // 默认选中第一个组件
    }

    // 把 componentList 存储到 Redux store 中
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }));
  }, [data, dispatch]);

  useEffect(() => {
    run(id);
  }, [id, run]);
  return { loading, error };
}

export default useLoadSurveyData;
