O `useCallback` é um **hook de otimização** do React usado para **memorizar funções** e impedir que elas sejam recriadas desnecessariamente em cada renderização. Ele é muito útil quando passamos funções como **props** para componentes filhos ou como **dependências** em outros hooks, como o `useEffect`.

---

### 📦 **Sintaxe Básica**

```javascript
const funcaoMemorizada = useCallback(() => {
	// Lógica da função
}, [dependências]);
```

-   **Função anônima:** A lógica que queremos memorizar.
-   **Array de dependências:** A função será recriada **apenas** quando alguma dependência mudar.
-   **Retorno:** A **mesma referência da função** é mantida enquanto as dependências não mudam.

---

### 🛠️ **Quando Usar o `useCallback`**

1. **Evitar Recriação de Funções:**  
   Impede que funções sejam recriadas a cada renderização.

2. **Evitar Re-renderizações Desnecessárias:**  
   Muito útil ao passar funções para componentes filhos que são **otimizados** com `React.memo`.

3. **Funções como Dependências de Hooks:**  
   Garante que funções não sejam recriadas, evitando execuções desnecessárias de hooks como `useEffect`.

---

### 🔍 **Diferença entre `useCallback` e `useMemo`**

| **`useCallback`**                     | **`useMemo`**                                  |
| ------------------------------------- | ---------------------------------------------- |
| Memoriza a **função em si**.          | Memoriza o **resultado de uma função**.        |
| Retorna uma **função**.               | Retorna um **valor**.                          |
| Uso: **Callbacks** em eventos, props. | Uso: **Cálculos pesados** ou valores estáveis. |

🔎 **Exemplo:**

```javascript
const funcao = useCallback(() => fazAlgo(), [deps]); // Memoriza a função
const valor = useMemo(() => calculoPesado(), [deps]); // Memoriza o valor
```

---

### 📚 **Exemplos Práticos**

---

#### 1. **Evitar Re-renderização com `React.memo`**

```javascript
import { useState, useCallback, memo } from "react";

const Botao = memo(({ onClick, children }) => {
	console.log(`Renderizando botão: ${children}`);
	return <button onClick={onClick}>{children}</button>;
});

function Contador() {
	const [contador, setContador] = useState(0);
	const [contador2, setContador2] = useState(0);

	const incrementar = useCallback(() => setContador((prev) => prev + 1), []);
	const incrementar2 = useCallback(() => setContador2((prev) => prev + 1), []);

	return (
		<div>
			<p>Contador 1: {contador}</p>
			<Botao onClick={incrementar}>Incrementar 1</Botao>

			<p>Contador 2: {contador2}</p>
			<Botao onClick={incrementar2}>Incrementar 2</Botao>
		</div>
	);
}
```

📌 **Explicação:**

-   O componente **`Botao`** é otimizado com **`React.memo`**, evitando re-renderizações desnecessárias.
-   As funções `incrementar` e `incrementar2` são **memorizadas** com `useCallback`, evitando a criação de novas funções.

---

#### 2. **Função Dependendo de Variáveis**

```javascript
import { useState, useCallback } from "react";

function Saudacao() {
	const [nome, setNome] = useState("João");

	const mostrarSaudacao = useCallback(() => {
		alert(`Olá, ${nome}!`);
	}, [nome]);

	return (
		<div>
			<input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
			<button onClick={mostrarSaudacao}>Saudar</button>
		</div>
	);
}
```

📌 **Explicação:**

-   A função `mostrarSaudacao` **depende** de `nome`.
-   Quando `nome` muda, o `useCallback` cria uma nova versão da função.

---

#### 3. **Função como Dependência no `useEffect`**

```javascript
import { useState, useEffect, useCallback } from "react";

function ContadorComLog() {
	const [contador, setContador] = useState(0);

	const logContador = useCallback(() => {
		console.log(`Contador: ${contador}`);
	}, [contador]);

	useEffect(() => {
		logContador();
	}, [logContador]);

	return <button onClick={() => setContador(contador + 1)}>Incrementar</button>;
}
```

📌 **Explicação:**

-   Sem `useCallback`, a função `logContador` seria **recriada** a cada render.
-   Com `useCallback`, o **`useEffect`** só executa quando o `contador` muda.

---

### ⚠️ **Boas Práticas com `useCallback`**

1. **Evite Uso Excessivo:**  
   Só use quando for necessário. Memorizar funções simples pode prejudicar a performance.

2. **Gerencie Dependências com Cuidado:**  
   Sempre inclua todas as variáveis usadas dentro da função no array de dependências.

3. **Combine com `React.memo`:**  
   O `useCallback` só faz sentido quando combinado com componentes otimizados (ex.: `React.memo`).

4. **Use em Eventos Complexos:**  
   Ideal para eventos de **scroll**, **resize** ou **drag and drop**.

---

### 🚨 **Erros Comuns**

1. **Esquecer Dependências**

    ❌ **Errado:**

    ```javascript
    const funcao = useCallback(() => console.log(nome), []);
    ```

    ✅ **Correto:**

    ```javascript
    const funcao = useCallback(() => console.log(nome), [nome]);
    ```

2. **Usar sem Necessidade**

    ❌ Memorizar funções simples que não são passadas para componentes filhos.

3. **Confundir com `useMemo`**

    ❌ **Errado:**

    ```javascript
    const funcao = useMemo(() => () => console.log("Olá"), []);
    ```

    ✅ **Correto:**

    ```javascript
    const funcao = useCallback(() => console.log("Olá"), []);
    ```

---

### 📝 **Resumo**

-   **`useCallback`** memoriza **funções** para evitar recriação desnecessária.
-   Ideal para **passar funções como props** e **evitar re-renderizações**.
-   Funciona muito bem junto com **`React.memo`**.
-   Deve ser usado com **cuidado** e apenas quando há impacto real na performance.
