/*
useLayoutEffect é similar ao useEffect, mas é executado sincronicamente após as mutações do DOM.
Ideal para medições ou ajustes no DOM antes que ele seja pintado na tela.
*/

import React, { useState, useLayoutEffect, useRef } from "react";

const Component = () => {
	const [width, setWidth] = useState(0);
	const divRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		setWidth(divRef.current?.offsetWidth || 0);
	}, []);

	return (
		<div ref={divRef} style={{ width: "50%" }}>
			<p>A largura do elemento é: {width}px</p>
		</div>
	);
};

export default Component;
