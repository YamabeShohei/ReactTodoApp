import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { dummyTodoList } from './data/dummyTodoList';

function App() {
  const [todoList, setTodoList] = useState(dummyTodoList);

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

  return (
    <main className="mx-auto mt-10 max-w-xl space-y-10">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="space-y-5">
        <AddTodoForm addTodo={addTodo} />
        <div className="rounded bg-slate-200 p-5">
          <TodoList todoList={todoList} changeCompleted={changeCompleted} />
        </div>
      </div>
    </main>
  );
}

export default App;
