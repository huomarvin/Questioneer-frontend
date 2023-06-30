import React, { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { ComponentConfType, componentConfGroup } from '@/components/QuestionComponents';
import { addComponent } from '@/store/surveyReducer';

function GenComponent(config: ComponentConfType, index: number) {
  const { Component, title, type, defaultProps } = config;
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    );
  }, [defaultProps, dispatch, title, type]);
  return (
    <div
      key={index}
      className=" mt-3 cursor-pointer bg-slate-50 p-3 rounded border border-sky-500 hover:border-sky-600"
      onClick={handleClick}
    >
      <div className="pointer-events-none">
        <Component />
      </div>
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="w-52 p-6 bg-slate-100">
      {componentConfGroup.map(group => {
        const { components, groupId, groupName } = group;
        return (
          <div key={groupId} className="mt-6">
            <div className="text-lg font-bold">{groupName}</div>
            <div>{components.map((c, index) => GenComponent(c, index))}</div>
          </div>
        );
      })}
    </div>
  );
}

export default LeftPanel;
