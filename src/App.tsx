import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import './App.scss';
import Button from './components/Button/Button';

const generateId = () => Math.floor(Math.random() * 1000000000);

const initialTodo = [
  {
    id: generateId(),
    title: 'Buy Milk',
    completed: false,
  },
];

type Todo = typeof initialTodo[0]

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todo, setTodo] = useState(initialTodo);

  const inputElement = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (!inputElement.current) {
      return;
    }

    inputElement.current.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const addTodo = useCallback(() => {
    if (!inputValue) {
      return;
    }

    const clonedArray: Todo[] = [
      ...todo,
      {
        id: generateId(),
        title: inputValue,
        completed: false,
      },
    ];

    setInputValue('');
    setTodo(clonedArray);
  }, [inputValue]);

  const completeTask = (index: number) => {
    const clonedTodo = [...todo];

    clonedTodo[index].completed = true;

    setTodo(clonedTodo);
  };

  const deleteTask = (index: number) => {
    const clonedTodo = [...todo];

    clonedTodo.splice(index, 1);

    setTodo(clonedTodo);
  };

  return (
    <div className="container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
        className="inputWrapper"
      >
        <input
          className="input"
          type="text"
          placeholder="Buy milk..."
          value={inputValue}
          ref={inputElement}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <Button
          type="submit"
          onClick={focusInput}
        >
          Submit
        </Button>
      </form>
      <div>
        <Button
          onClick={focusInput}
        >
          Focus Element
        </Button>
      </div>
      <div className="itemWrapper">
        { todo.map(({ id, title, completed }, index) => (
          <div className={`item ${completed && 'completed'}`} key={id}>
            <div />
            {title}
            <div className="buttonWrapper">
              <Button
                onClick={() => completeTask(index)}
                disabled={completed}
              >
                Complete
              </Button>

              <Button
                onClick={() => deleteTask(index)}
                variation="outlined"
              >
                Delete
              </Button>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
};

export default App;

// Uztaisāt Todo kartiņas komponenti
// tad kad tu viņu complīto tad jāparāda zaļās toast, ka ir parādīts
// ja izdzēs tad jāparāda, ka ir izdzēsts
// un pēc tam kad ir izdzēsts vai pabeigts uzdevums, vajag iefokusēt input elementu

// toast: https://www.npmjs.com/package/react-toastify
