// Exemplo de componente com useRef

/*
useRef é um hook que permite criar uma referência mutável que persiste entre renderizações.
É frequentemente usado para acessar elementos DOM diretamente ou armazenar valores que não provocam re-renderizações.
*/

import React, { useRef } from "react";

const UseRefExample = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const focusInput = () => {
		inputRef.current?.focus();
	};

	return (
		<div>
			<input ref={inputRef} type="text" placeholder="Digite algo..." />
			<button onClick={focusInput}>Focar no input</button>
		</div>
	);
};

export default UseRefExample;
