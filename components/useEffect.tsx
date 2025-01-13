// Exemplo de componente com useEffect

/*
useEffect é um hook que permite executar efeitos colaterais em componentes funcionais.
O efeito é executado após a renderização do componente e após cada atualização do mesmo.
O hook recebe dois argumentos: uma função de efeito e uma lista de dependências.
*/

import React, { useState, useEffect } from "react";

const Component = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `Count: ${count}`;
	}, [count]);

	return (
		<div>
			<p>{count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
};

export default Component;
