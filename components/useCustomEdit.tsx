// Exemplo de componente com hook customizado e valor editável

/*
useCustomEdit é um hook customizado que retorna um valor reativo, com uma função para atualizá-lo.
O hook utiliza o hook useState para armazenar o valor e o hook useEffect para atualizá-lo.

ATENÇÃO: O estado do hook não é compartilhado entre componentes, cada componente que utiliza o hook tem seu próprio estado.
*/

import React, { useState, useEffect } from "react";

const useCustomEdit = (initialValue: string) => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		document.title = `Value: ${value}`;
	}, [value]);

	return [value, setValue] as const;
};

const Component = () => {
	const [value, setValue] = useCustomEdit("Initial value");

	return (
		<div>
			<p>{value}</p>
			<input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
		</div>
	);
};

export default Component;
