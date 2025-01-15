O `useLayoutEffect` é um **hook avançado** do React, muito parecido com o `useEffect`, mas com diferenças importantes relacionadas ao **tempo de execução**. Ele é utilizado quando você precisa executar efeitos que devem ocorrer **antes** da atualização visual do navegador, garantindo que as alterações no DOM sejam aplicadas de forma **sincronizada** com a renderização.

---

### 📦 **Sintaxe Básica**

```javascript
useLayoutEffect(() => {
	// Código executado após a renderização, mas antes da tela ser atualizada
	return () => {
		// Função de limpeza (opcional)
	};
}, [dependências]);
```

---

### ⏳ **Diferença entre `useEffect` e `useLayoutEffect`**

| **`useEffect`**                                     | **`useLayoutEffect`**                             |
| --------------------------------------------------- | ------------------------------------------------- |
| Executa **após** o navegador atualizar a tela.      | Executa **antes** da atualização visual.          |
| **Assíncrono**: não bloqueia o redesenho da UI.     | **Síncrono**: bloqueia a atualização da tela.     |
| Ideal para: **requisições HTTP**, eventos globais.  | Ideal para: **manipulação de DOM** e **medidas**. |
| Pode causar **"flickering"** se manipular o layout. | Garante que o layout seja atualizado suavemente.  |

📌 **Resumo:**

-   **`useEffect`:** Acontece depois que a tela foi atualizada.
-   **`useLayoutEffect`:** Acontece antes da atualização visual, prevenindo **pisca-pisca** ou atrasos no layout.

---

### 🔍 **Exemplo Prático: Ajustar o Scroll**

```javascript
import { useLayoutEffect, useRef } from "react";

function ScrollParaBaixo() {
	const listaRef = useRef(null);

	useLayoutEffect(() => {
		listaRef.current.scrollTop = listaRef.current.scrollHeight;
	}, []);

	return (
		<div
			ref={listaRef}
			style={{
				height: "200px",
				overflowY: "scroll",
				border: "1px solid black",
			}}
		>
			{Array.from({ length: 50 }, (_, i) => (
				<p key={i}>Item {i + 1}</p>
			))}
		</div>
	);
}
```

📌 **Explicação:**

-   **`useLayoutEffect`** garante que o scroll vá para o final da lista **antes** do navegador atualizar a tela.
-   Se fosse usado o **`useEffect`**, poderia causar um pequeno atraso perceptível.

---

### 🏗️ **Exemplo: Medir Elementos do DOM**

Quando precisamos **medir o tamanho** ou **posição** de um elemento assim que ele for renderizado, o `useLayoutEffect` é ideal.

```javascript
import { useLayoutEffect, useRef, useState } from "react";

function MedirDiv() {
	const divRef = useRef(null);
	const [largura, setLargura] = useState(0);

	useLayoutEffect(() => {
		setLargura(divRef.current.getBoundingClientRect().width);
	}, []);

	return (
		<div>
			<div ref={divRef} style={{ width: "300px", height: "100px", backgroundColor: "lightblue" }}>
				Caixa Azul
			</div>
			<p>Largura da caixa: {largura}px</p>
		</div>
	);
}
```

📌 **Explicação:**

-   O `useLayoutEffect` mede a **largura** da `div` antes de a tela ser exibida.
-   Garante que o valor exibido não cause **piscadas** ou mudanças bruscas na tela.

---

### 🎯 **Quando Usar o `useLayoutEffect`**

1. **Manipulação Direta do DOM:**

    - Ajustes de rolagem (`scroll`).
    - Posicionamento dinâmico de elementos.
    - Aplicação de **animações** manuais.

2. **Leitura de Layouts e Medidas:**

    - Usar propriedades como `getBoundingClientRect()`, `offsetHeight`, etc.
    - Medir elementos antes da exibição visual.

3. **Correção de Layouts Condicionais:**

    - Ajustes finos em elementos que dependem de cálculos dinâmicos.
    - Evitar glitches visuais.

4. **Sincronização com Outras Bibliotecas:**
    - Integração com bibliotecas de animação (ex: **GSAP**, **Framer Motion**).
    - Correção de conflitos entre React e scripts externos.

---

### ⚠️ **Boas Práticas com `useLayoutEffect`**

1. **Evite Efeitos Pesados:**  
   Como é **síncrono**, efeitos complexos podem **travar a interface**.

2. **Sempre Limpe os Efeitos:**  
   Use a função de limpeza (`cleanup`) para evitar **vazamentos de memória**.

    ```javascript
    useLayoutEffect(() => {
    	const listener = () => console.log("Scroll detectado");
    	window.addEventListener("scroll", listener);

    	return () => window.removeEventListener("scroll", listener);
    }, []);
    ```

3. **Use Apenas Quando Necessário:**  
   Prefira o `useEffect` sempre que possível. Use `useLayoutEffect` apenas para ajustes críticos no layout.

4. **Dependências Corretas:**  
   Sempre inclua todas as variáveis utilizadas dentro do hook no array de dependências.

---

### 🚨 **Erros Comuns**

1. **Usar para Efeitos Assíncronos (como Fetch):**  
   `useLayoutEffect` **não** é adequado para operações assíncronas, como requisições HTTP.

    ❌ **Errado:**

    ```javascript
    useLayoutEffect(() => {
    	fetch("/api/dados").then((res) => res.json());
    }, []);
    ```

    ✅ **Correto:** Use `useEffect` para esse caso.

2. **Não Limpar Eventos ou Listeners:**  
   Esquecer de remover eventos pode causar **vazamento de memória**.

3. **Bloquear a UI:**  
   Colocar cálculos pesados dentro do `useLayoutEffect` pode **travar** a tela.

    ❗ **Evite:**

    ```javascript
    useLayoutEffect(() => {
    	while (true) {} // Bloqueia o navegador
    }, []);
    ```

---

### 📝 **Resumo**

-   **`useLayoutEffect`** é como o `useEffect`, mas executa **antes da atualização visual**.
-   Ideal para **manipulação de DOM**, **medidas de layout** e **ajustes visuais**.
-   **Evite cálculos pesados** nele, pois bloqueia a renderização.
-   Prefira o `useEffect` para efeitos que **não dependem do layout**.
