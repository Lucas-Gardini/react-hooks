// Exemplo de componente com useState

/*
useState é um hook que retorna um array com dois elementos: o estado atual e uma função para atualizar o estado.
O estado inicial é passado como argumento para a função useState.
*/

import React, { useState } from "react";

const Component = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>{count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
};

export default Component;
