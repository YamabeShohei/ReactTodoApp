import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    // ローカルストレージからTODOリストデータを取得
    const localStorageTodoList = localStorage.getItem('todoList');
    return JSON.parse(localStorageTodoList ?? '[]');
  });

  useEffect(() => {
    // todoListの値が変更されたときにローカルストレージに保存する
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  /**
   * チェック処理
   * @param id ID番号
   */
  const changeCompleted = (id: number) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });
    });
  };

  /**
   * TODOリストのデータ追加
   * @param title TODOタイトル
   */
  const addTodo = (title: string) => {
    setTodoList((prevTodoList) => {
      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
      };

      return [newTodo, ...prevTodoList];
    });
  };

  const deleteTodo = (id: number) => {
    setTodoList(() => {
      return todoList.filter((todo) => {
        return todo.id !== id;
      });
    });
  };

  const deleteAllCompleted = () => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((todo) => {
        return !todo.completed;
      });
    });
  };

  return {
    todoList,
    changeCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompleted,
  }
};
