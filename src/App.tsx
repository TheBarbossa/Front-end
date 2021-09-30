import React, { useState } from 'react';
import './App.scss';

const generateId = () => Math.floor(Math.random() * 1000000000);

const initialTodo = [
  {
    id: generateId(),
    title: 'Buy Milk',
  },
];

type Todo = typeof initialTodo[0]

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todo, setTodo] = useState(initialTodo);

  const addTodo = () => {
    if (!inputValue) {
      return;
    }

    const clonedArray: Todo[] = [
      ...todo,
      {
        id: generateId(),
        title: inputValue,
      },
    ];

    setInputValue('');
    setTodo(clonedArray);
  };

  return (
    <div className="container">
      <div className="inputWrapper">
        <input
          className="input"
          type="text"
          placeholder="Buy milk..."
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button
          type="button"
          className="button"
          onClick={addTodo}
        >
          submit
        </button>
      </div>
      <div className="itemWrapper">
        { todo.map(({ id, title }) => (
          <div className="item" key={id}>
            {title}
          </div>
        )) }
      </div>
    </div>
  );
};

export default App;

// 2 opcijas 1) izdzēst 2) pabeigt
// uz dzēšanu ņemam ārā, lai lietotājs neredz
// uz pabeigts pielikam kādu CSS klāt (fona krāsa cita, nosvītrots teksts)
// un var arī izpausties ar citām funkcijām, kā, piemēram, nerādīt pogu pabeigt ja ir jau pabeigts
