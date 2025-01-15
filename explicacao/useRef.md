O `useRef` é um **hook** do React usado para criar uma **referência mutável** que persiste durante todo o ciclo de vida de um componente. Ele é comumente utilizado para:

1. **Referenciar elementos DOM diretamente** (sem renderização).
2. **Armazenar valores mutáveis** sem causar re-renderizações.
3. **Persistir dados entre renderizações**.

---

### 📦 **Sintaxe Básica**

```javascript
const referencia = useRef(valorInicial);
```

-   **`referencia`**: Um objeto com a propriedade `.current` onde o valor é armazenado.
-   **`valorInicial`**: O valor inicial atribuído a `.current`.

---

### 🔍 **Como Funciona**

O `useRef` retorna um **objeto persistente** com a seguinte estrutura:

```javascript
{
	current: valor;
}
```

✅ **Atualizar** a propriedade `.current` **NÃO** causa re-renderização do componente.  
❗ **Atualizar estado com `useState`** provoca re-renderização.

---

### 🔗 **Diferença entre `useRef` e `useState`**

| **`useState`**                                     | **`useRef`**                                        |
| -------------------------------------------------- | --------------------------------------------------- |
| Atualizar o estado causa re-renderização.          | Atualizar `.current` **não** causa re-renderização. |
| Ideal para valores que afetam o layout/UI.         | Ideal para valores mutáveis ou referências.         |
| Não é persistente entre renders sem re-renderizar. | Persiste entre renders.                             |

---

### 🏗️ **Principais Usos do `useRef`**

---

#### 1. **Manipular Elementos do DOM**

Ideal para acessar e manipular elementos sem usar `document.querySelector`.

```javascript
import { useRef } from "react";

function InputFocus() {
	const inputRef = useRef(null);

	const focarInput = () => {
		inputRef.current.focus();
	};

	return (
		<div>
			<input ref={inputRef} type="text" placeholder="Digite algo..." />
			<button onClick={focarInput}>Focar no Input</button>
		</div>
	);
}
```

📌 **Explicação:**

-   O `ref` é atribuído ao input.
-   Ao clicar no botão, o método `.focus()` é chamado diretamente no elemento DOM.

---

#### 2. **Armazenar Valores sem Re-renderizar**

Usado para armazenar informações que não precisam atualizar a UI.

```javascript
import { useRef, useState } from "react";

function ContadorRender() {
	const [contador, setContador] = useState(0);
	const renders = useRef(0);

	renders.current++;

	return (
		<div>
			<p>Contador: {contador}</p>
			<p>Renderizações: {renders.current}</p>
			<button onClick={() => setContador(contador + 1)}>Incrementar</button>
		</div>
	);
}
```

📌 **Explicação:**

-   A cada renderização, `renders.current` é incrementado.
-   Como `renders.current` **não causa re-renderização**, o componente não entra em loop.

---

#### 3. **Persistir Valores em Eventos Assíncronos**

Evita capturar valores desatualizados em closures.

```javascript
import { useState, useRef, useEffect } from "react";

function Timer() {
	const [contador, setContador] = useState(0);
	const contadorRef = useRef(contador);

	useEffect(() => {
		contadorRef.current = contador;
	}, [contador]);

	useEffect(() => {
		const intervalo = setInterval(() => {
			console.log(`Valor atual: ${contadorRef.current}`);
		}, 1000);

		return () => clearInterval(intervalo);
	}, []);

	return <button onClick={() => setContador(contador + 1)}>Incrementar</button>;
}
```

📌 **Explicação:**

-   O `contadorRef` sempre armazena o valor atualizado de `contador`.
-   O `setInterval` acessa o valor correto mesmo sem re-renderizar.

---

#### 4. **Armazenar Intervalos ou Timeouts**

Facilita o controle de timers sem re-renderizar.

```javascript
import { useRef } from "react";

function Temporizador() {
	const timerRef = useRef(null);

	const iniciarTimer = () => {
		timerRef.current = setInterval(() => {
			console.log("Executando...");
		}, 1000);
	};

	const pararTimer = () => {
		clearInterval(timerRef.current);
		console.log("Timer parado");
	};

	return (
		<div>
			<button onClick={iniciarTimer}>Iniciar</button>
			<button onClick={pararTimer}>Parar</button>
		</div>
	);
}
```

📌 **Explicação:**

-   O `timerRef` armazena o ID do intervalo.
-   Evita o uso desnecessário de estados apenas para armazenar o ID.

---

### ⚠️ **Boas Práticas com useRef**

1. **Evite usar para controlar a UI:**  
   Se o valor afeta a interface, prefira `useState`.

2. **Ideal para variáveis mutáveis:**  
   Use para armazenar **referências DOM**, **timers** ou **valores não reativos**.

3. **Função Pura:**  
   Não use `useRef` para criar efeitos colaterais dentro de componentes.

---

### 🚨 **Erros Comuns**

1. **Confundir com `useState`:**

    ```javascript
    const contador = useRef(0);
    contador.current++;
    console.log(contador.current); // Não re-renderiza
    ```

    ❗ Se quiser que a UI atualize, use `useState`.

2. **Acessar `.current` antes do render:**  
   Referências DOM são populadas **após** o componente ser montado.

    ```javascript
    console.log(inputRef.current); // null antes do render
    ```

3. **Mutar objetos diretamente:**  
   Evite mutar objetos complexos em `.current`.

    ```javascript
    inputRef.current.value = "Novo valor"; // Funciona, mas evite para controle de inputs
    ```

---

### 📝 **Resumo**

-   **`useRef`** cria uma **referência persistente** que não dispara re-renderizações.
-   Ideal para **manipular DOM**, **armazenar valores mutáveis** e **gerenciar timers**.
-   Diferente de `useState`, **não afeta a UI** diretamente.
-   Útil para **persistir dados** e acessar o **valor mais recente** sem re-renderizar.
