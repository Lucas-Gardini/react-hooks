// Exemplo de componente com useCallback

/* 
useCallback é um hook que retorna uma versão memorizada de uma função, evitando que a função seja recriada a cada renderização do componente.
Isso é útil quando a função é passada como prop para componentes filhos, pois evita que o componente filho seja renderizado desnecessariamente.
Para isso, o filho deve deve ser envolvido pelo React.memo, que faz a comparação rasa das props recebidas.
*/

import React, { useState, useCallback, memo } from "react";

const Button = memo(({ onClick }: { onClick: VoidFunction }) => {
	console.log("Botão renderizado");
	return <button onClick={onClick}>Increment</button>;
});

const Component = () => {
	const [count, setCount] = useState(0);
	const [otherState, setOtherState] = useState(false);

	const increment = useCallback(() => {
		setCount((prevCount) => prevCount + 1);
	}, []);

	const incrementByOtherState = useCallback(() => {
		setCount((prevCount) => prevCount + (otherState ? 1 : 2));
	}, [otherState]);

	return (
		<div>
			<p>{count}</p>
			<Button onClick={increment} />
			<Button onClick={incrementByOtherState} />

			<button onClick={() => setOtherState(!otherState)}>Toggle Other State</button>
			<p>Other State: {otherState.toString()}</p>
		</div>
	);
};

export default Component;
