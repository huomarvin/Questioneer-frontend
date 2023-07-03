import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortableItem from '@/components/DragSortable/SortableItem';
import { getComponentConfByType } from '@/components/QuestionComponents';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import { ComponentInfoType, changeSelectedId, moveComponent } from '@/store/surveyReducer';
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
  console.log('🚀 ~ file: EditCanvas.tsx:23 ~ EditCanvas ~ componentList:', componentList);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, fe_id: string) => {
    event.stopPropagation();
    dispatch(changeSelectedId(fe_id));
  };
  const componentListWithId = componentList.map(c => ({ ...c, id: c.fe_id }));
  function handleDragEnd(oldIndex: number, newIndex: number) {
    console.log('🚀 ~ file: EditCanvas.tsx:29 ~ handleDragEnd ~ oldIndex:', oldIndex, newIndex);
    dispatch(moveComponent({ oldIndex, newIndex }));
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className="flex-1">
        <div className=" w-96 mx-auto bg-slate-50 p-4">
          {componentList
            .filter(x => !x.isHidden)
            .map((component: ComponentInfoType) => {
              const { fe_id } = component;
              const classNames = classnames({
                'mt-4 cursor-pointer hover:bg-slate-100 p-3 rounded border': true,
                'border-sky-500 hover:border-sky-600': fe_id === selectedId,
              });
              return (
                <SortableItem key={fe_id} id={fe_id}>
                  <div
                    className={classNames}
                    key={fe_id}
                    onClick={event => handleClick(event, fe_id)}
                  >
                    <div className=" pointer-events-none">{genComponent(component)}</div>
                  </div>
                </SortableItem>
              );
            })}
        </div>
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
