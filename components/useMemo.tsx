// Exemplo de componente com useMemo

/*
useMemo é um hook que retorna um valor memorizado, evitando que o valor seja recalculado a cada renderização do componente.
Isso é útil quando o cálculo do valor é custoso e não precisa ser recalculado a cada renderização.
Ou quando sua atualização é feita quando uma ou mais dependências mudam.
*/

import React, { useState, useMemo } from "react";

const Component = () => {
	const [count, setCount] = useState(0);
	const doubleCount = useMemo(() => count * 2, [count]);

	return (
		<div>
			<p>{doubleCount}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
};

export default Component;
