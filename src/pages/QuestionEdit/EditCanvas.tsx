import { getComponentConfByType } from '@/components/QuestionComponents';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import { ComponentInfoType, changeSelectedId } from '@/store/surveyReducer';
import classnames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';

const genComponent = (component: ComponentInfoType) => {
  const { type, props } = component;
  const componentConf = getComponentConfByType(type);
  if (!componentConf) {
    return null;
  }
  const { Component } = componentConf;
  return <Component {...props} />;
};

const EditCanvas = () => {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, fe_id: string) => {
    event.preventDefault();
    dispatch(changeSelectedId(fe_id));
  };
  return (
    <div className="flex-1">
      <div className=" w-96 mx-auto bg-slate-50 p-4">
        {componentList.map((component: ComponentInfoType) => {
          const { fe_id } = component;
          const classNames = classnames({
            'mt-4 cursor-pointer hover:bg-slate-100 p-3 rounded border': true,
            'border-sky-500 hover:border-sky-600': fe_id === selectedId,
          });
          return (
            <div className={classNames} key={fe_id} onClick={event => handleClick(event, fe_id)}>
              <div className=" pointer-events-none">{genComponent(component)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditCanvas;
