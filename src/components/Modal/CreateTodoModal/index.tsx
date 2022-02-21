import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';

import { Tags } from 'containers';
import { ModalContext } from 'context/ModalContext';
import { TagItemInterface, TodoListInterface } from 'models';
import { todoInitialValue } from 'models/initialValue';

interface PropsCreateTodo {
  setTagList: React.Dispatch<React.SetStateAction<TagItemInterface[]>>;
  tagList: TagItemInterface[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoListInterface[]>>;
  createTodo: (
    list: TodoListInterface[],
    item: TodoListInterface
  ) => TodoListInterface[];
  editTodo: (
    list: TodoListInterface[],
    item: TodoListInterface
  ) => TodoListInterface[];
  setEditItem: React.Dispatch<React.SetStateAction<TodoListInterface | null>>;
  editItem?: TodoListInterface | null;
  edit?: boolean;
}

const CreateTodoModal = (props: PropsCreateTodo) => {
  const {
    setTodoList,
    tagList,
    setTagList,
    createTodo,
    editTodo,
    editItem,
    setEditItem,
    edit = false
  } = props;

  const [values, setValues] = useState<TodoListInterface>({
    ...todoInitialValue,
    id: String(Date.now())
  });
  const [selectTag, setSelectTag] = useState<TagItemInterface[]>([]);
  const { closeModal } = useContext(ModalContext);

  const handleSetValue = (field: string, value: string) => {
    setValues(prev => {
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleToggleSelectTag = (selectTag: TagItemInterface[]) => {
    setValues(prev => {
      return {
        ...prev,
        tagList: selectTag
      };
    });
  };

  const handleCreateTodo = () => {
    setTodoList(prevTags => createTodo(prevTags, values));
    alert('생성 되었습니다.');
    sessionStorage.setItem('edit-todo', '');
    closeModal();
  };

  const handleEditTodo = (item: TodoListInterface) => {
    setTodoList(prevList => editTodo(prevList, item));
    alert('수정 되었습니다.');
    setEditItem(null);
    sessionStorage.setItem('edit-todo', '');
    closeModal();
  };

  const handleGoBack = () => {
    sessionStorage.setItem('edit-todo', '');
    setEditItem(null);
    closeModal();
  };

  useEffect(() => {
    handleToggleSelectTag(selectTag);
  }, [selectTag]);

  useLayoutEffect(() => {
    if (sessionStorage.getItem('edit-todo')) {
      setEditItem(JSON.parse(sessionStorage.getItem('edit-todo') as string));
    }
  }, [sessionStorage]);

  useEffect(() => {
    if (editItem) {
      setValues(
        editItem ? editItem : { ...todoInitialValue, id: String(Date.now()) }
      );
      setSelectTag(editItem ? editItem.tagList : []);
    }
  }, [editItem]);

  return (
    <div className="create-todo-area">
      <button onClick={handleGoBack} className="close-btn">
        CLOSE
      </button>

      <h2 className="title">새로운 일정 생성</h2>
      <div className="create-todo-input">
        <label htmlFor="create-todo-title" className="required">
          *
        </label>
        <input
          type="text"
          id="create-todo-title"
          required
          maxLength={20}
          placeholder="제목을 입력하세요"
          value={values.title}
          onChange={title => handleSetValue('title', title.currentTarget.value)}
        />
      </div>
      <textarea
        name=""
        id="create-todo-content"
        cols={30}
        rows={5}
        placeholder="설명을 입력하세요"
        value={values.content}
        onChange={content =>
          handleSetValue('content', content.currentTarget.value)
        }
      ></textarea>
      <Tags
        tagList={tagList}
        setTagList={setTagList}
        isEdit
        setSelectTag={setSelectTag}
        selectTag={edit ? values.tagList : selectTag}
      />
      <button
        type="submit"
        className="create-btn"
        onClick={() => (edit ? handleEditTodo(values) : handleCreateTodo())}
      >
        {edit ? '수정하기' : '생성하기'}
      </button>
    </div>
  );
};

export default React.memo(CreateTodoModal);
