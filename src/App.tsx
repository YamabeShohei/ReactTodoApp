import { TodoList } from './components/TodoList';
import { dummyTodoList } from './data/dummyTodoList';

function App() {
  return (
    <main className="mx-auto mt-10 max-w-xl">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="rounded bg-slate-200 p-5">
        <div className="space-y-3">
          <TodoList todoList={dummyTodoList} />
        </div>
      </div>
    </main>
  );
}

export default App;
