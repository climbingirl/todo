import { useRequestGetTodos } from '../../hooks';
import MainPage from '../../pages/mainPage/mainPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Todo from '../../pages/todo/todo';
import styles from './app.module.scss';
import NotFound from '../../pages/notFound/notFound';

const App = () => {
  const { todos, setTodos, isLoading } = useRequestGetTodos();

  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage todos={todos} setTodos={setTodos} isLoading={isLoading} />}
          />
          <Route path="/task/:id" element={<Todo setTodos={setTodos} />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
