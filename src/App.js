import React from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";

import awsconfig from "./aws-exports";
import * as queries from "./graphql/queries";

Amplify.configure(awsconfig);

function App() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    async function init() {
      const { data } = await API.graphql(graphqlOperation(queries.listTodos));
      setTodos(data.listTodos.items);
    }

    init();
  }, []);

  return (
    <div className="App">
      <ul>
        {todos.map(todo => (
          <li>
            <input type="checkbox" value={todo.done} />
            {`${todo.name} - ${todo.description}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
