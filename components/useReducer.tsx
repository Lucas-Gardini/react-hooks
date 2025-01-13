/*
useReducer é uma alternativa ao useState para gerenciamento de estados mais complexos.
Ele aceita um reducer (uma função que manipula o estado) e um estado inicial.
*/

import React, { useReducer } from "react";

interface IState {
	count: number;
}

interface IAction {
	type: "increment" | "decrement";
}

const reducer = (state: IState, action: IAction) => {
	switch (action.type) {
		case "increment":
			return { count: state.count + 1 };
		case "decrement":
			return { count: state.count - 1 };
		default:
			return state;
	}
};

const Component = () => {
	const [state, dispatch] = useReducer(reducer, { count: 0 });

	return (
		<div>
			<p>{state.count}</p>
			<button onClick={() => dispatch({ type: "increment" })}>Incrementar</button>
			<button onClick={() => dispatch({ type: "decrement" })}>Decrementar</button>
		</div>
	);
};

export default Component;
