import { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoSummary } from './components/TodoSummary';
import { Todo } from './types/todo';

function App() {
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

  return (
    <main className="mx-auto mt-10 max-w-xl space-y-10">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="space-y-5">
        <AddTodoForm addTodo={addTodo} />
        <div className="space-y-5 rounded bg-slate-200 p-5">
          <TodoList
            todoList={todoList}
            changeCompleted={changeCompleted}
            deleteTodo={deleteTodo}
          />
          <TodoSummary deleteAllCompleted={deleteAllCompleted} />
        </div>
      </div>
    </main>
  );
}

export default App;
