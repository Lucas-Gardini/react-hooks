// Exemplo de componente com hook customizado

/*
useCustom é um hook customizado que retorna um valor reativo, baseado na largura da tela.
O hook utiliza o hook useState para armazenar a largura da tela e o hook useEffect para atualizá-la.

ATENÇÃO: O estado do hook não é compartilhado entre componentes, cada componente que utiliza o hook tem seu próprio estado.
*/

import React, { useState, useEffect } from "react";

const useCustom = () => {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return width;
};

const Component = () => {
	const width = useCustom();

	return <p>Width: {width}</p>;
};

export default Component;
