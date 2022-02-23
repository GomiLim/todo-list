import React, { useState } from 'react';
import { MAIN_COLOR } from 'libs/constant';
import { TagData } from 'stores/tag';

interface PropsCreateTag {
  onSave: (tag: TagData) => void;
  tagTextRef: React.RefObject<HTMLInputElement>;
  tagColorRef: React.RefObject<HTMLInputElement>;
}
export const CreateTag = (props: PropsCreateTag) => {
  const { onSave, tagTextRef, tagColorRef } = props;
  const [values, setValues] = useState({ text: '', tagIcoColor: MAIN_COLOR });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="create-tag-inputs">
      <label htmlFor="tag-IcoColor"></label>
      <input
        ref={tagTextRef}
        type="text"
        id="tag-text"
        name="text"
        maxLength={20}
        value={tagTextRef.current?.value ?? values.text}
        onChange={handleChange}
      />
      <input
        ref={tagColorRef}
        type="color"
        id="tag-IcoColor"
        name="tagIcoColor"
        value={tagColorRef.current?.value ?? values.tagIcoColor}
        onChange={handleChange}
      />
      <button
        type="submit"
        onClick={() => onSave({ ...values, id: String(Date.now()) })}
      >
        저장
      </button>
    </div>
  );
};
