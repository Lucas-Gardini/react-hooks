O `useEffect` é um dos **hooks fundamentais do React** e foi introduzido na versão 16.8 para lidar com **efeitos colaterais** (side effects) em componentes funcionais, algo que antes era exclusivo de componentes de classe (via `componentDidMount`, `componentDidUpdate` e `componentWillUnmount`).

### ⚙️ **O que são Efeitos Colaterais?**

Efeitos colaterais são operações que ocorrem fora do fluxo de renderização do componente, como:

-   **Manipulação do DOM** diretamente.
-   **Requisições HTTP** para buscar dados de APIs.
-   **Subscrever** e **limpar** eventos.
-   **Timers** (`setTimeout`, `setInterval`).
-   Integração com **bibliotecas externas**.

---

### 📦 **Sintaxe Básica**

```javascript
useEffect(() => {
	// Código do efeito (executado após a renderização)
	return () => {
		// Função de limpeza (executada antes da desmontagem ou antes da re-execução)
	};
}, [dependências]);
```

-   **Função de Efeito**: A função passada para o `useEffect` é executada **após a renderização** do componente.
-   **Função de Limpeza (Cleanup)**: Opcional. Se fornecida, será executada antes de o componente ser desmontado ou antes do próximo efeito ser executado.
-   **Array de Dependências**: Controla quando o efeito será executado.

---

### 🔍 **Comportamento de Acordo com o Array de Dependências**

1. **Sem Dependências:**  
   O efeito será executado após **toda renderização** (montagem e atualização).

    ```javascript
    useEffect(() => {
    	console.log("Executa após cada renderização");
    });
    ```

2. **Array Vazio (`[]`)**:  
   O efeito será executado **apenas uma vez**, após a **primeira renderização** (comportamento similar ao `componentDidMount`).

    ```javascript
    useEffect(() => {
    	console.log("Executa apenas uma vez");
    }, []);
    ```

3. **Com Dependências:**  
   O efeito será executado sempre que algum valor no array de dependências **for alterado**.

    ```javascript
    const [count, setCount] = useState(0);

    useEffect(() => {
    	console.log(`O count mudou para: ${count}`);
    }, [count]);
    ```

4. **Função de Limpeza (Cleanup):**  
   Utilizada para limpar efeitos anteriores antes de executar novamente ou antes de desmontar o componente.

    ```javascript
    useEffect(() => {
    	const interval = setInterval(() => {
    		console.log("Executando...");
    	}, 1000);

    	// Cleanup
    	return () => {
    		clearInterval(interval);
    		console.log("Intervalo limpo");
    	};
    }, []);
    ```

---

### 📚 **Exemplos Práticos**

#### 1. **Requisição a uma API**

```javascript
import { useState, useEffect } from "react";

function Users() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchUsers() {
			const response = await fetch("https://jsonplaceholder.typicode.com/users");
			const data = await response.json();
			setUsers(data);
		}

		fetchUsers();
	}, []); // Executa apenas uma vez

	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	);
}
```

📌 **Explicação:** Faz uma chamada à API **uma única vez** ao montar o componente.

---

#### 2. **Manipulação de Eventos**

```javascript
import { useEffect } from "react";

function ResizeLogger() {
	useEffect(() => {
		const handleResize = () => console.log(`Largura: ${window.innerWidth}`);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return <p>Abra o console e redimensione a janela!</p>;
}
```

📌 **Explicação:** Adiciona um listener de resize e garante que será removido ao desmontar o componente.

---

#### 3. **Dependência Condicional**

```javascript
import { useState, useEffect } from "react";

function Timer() {
	const [count, setCount] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			setCount((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning]);

	return (
		<>
			<p>Tempo: {count}s</p>
			<button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Pausar" : "Iniciar"}</button>
		</>
	);
}
```

📌 **Explicação:** O `setInterval` só é iniciado se `isRunning` for `true`. Quando `isRunning` mudar, o intervalo é limpo e criado novamente.

---

### ⚠️ **Boas Práticas com useEffect**

1. **Evite Dependências Omissas:**  
   Sempre inclua no array de dependências todas as variáveis ou funções utilizadas no efeito.

2. **Efeitos Condicionados:**  
   Coloque condições dentro do efeito para evitar execuções desnecessárias.

3. **Limpeza Adequada:**  
   Sempre limpe efeitos que criam subscrições ou timers para evitar **vazamentos de memória**.

4. **Divida Efeitos Complexos:**  
   Prefira vários `useEffect` simples a um único `useEffect` com múltiplas responsabilidades.

---

### 🚨 **Erros Comuns**

-   **Falta de dependências:**  
    Não incluir variáveis usadas dentro do efeito no array de dependências pode causar bugs.

-   **Execução Infinita:**  
    Alterar o estado dentro de um `useEffect` sem um array de dependências pode causar loops infinitos.

    ```javascript
    useEffect(() => {
    	setCount(count + 1); // ⚠️ Loop infinito sem dependências
    });
    ```

-   **Função assíncrona diretamente no useEffect:**  
    Não é permitido declarar a função de efeito como `async`. Deve-se criar uma função interna.

    ```javascript
    useEffect(() => {
    	async function fetchData() {
    		await fetch("...");
    	}
    	fetchData();
    }, []);
    ```

---

### 📝 **Resumo**

-   O `useEffect` **sincroniza o componente com o mundo externo**.
-   Com o **array de dependências**, você controla **quando** e **como** o efeito será executado.
-   A **função de limpeza** garante que recursos sejam liberados corretamente.
-   Um uso cuidadoso evita **erros comuns** e **vazamentos de memória**.
