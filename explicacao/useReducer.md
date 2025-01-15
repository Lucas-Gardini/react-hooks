O `useReducer` é um **hook avançado** do React usado para gerenciar **estados complexos** ou **múltiplas transições de estado**. Ele é uma alternativa ao `useState` e é especialmente útil quando o estado tem várias subpartes ou quando as atualizações dependem de **ações condicionais**.

É inspirado no padrão de arquitetura **Redux** e no conceito de **reducers** de programação funcional, onde o estado é atualizado com base em **ações** (`action`) e uma **função redutora** (`reducer`).

---

### 📦 **Sintaxe Básica**

```javascript
const [estado, dispatch] = useReducer(reducer, estadoInicial);
```

-   **`estado`**: O valor atual do estado.
-   **`dispatch`**: Função que envia ações para o reducer, solicitando uma atualização no estado.
-   **`reducer`**: Função pura que recebe o estado atual e uma ação, retornando o novo estado.
-   **`estadoInicial`**: O valor inicial do estado.

---

### ⚙️ **Estrutura de um Reducer**

```javascript
function reducer(estado, action) {
	switch (action.type) {
		case "INCREMENTAR":
			return { contador: estado.contador + 1 };
		case "DECREMENTAR":
			return { contador: estado.contador - 1 };
		case "RESETAR":
			return { contador: 0 };
		default:
			return estado;
	}
}
```

📌 **Explicação:**

-   O reducer recebe dois argumentos: **estado atual** e a **ação** (`action`).
-   A **ação** é um objeto que **define o tipo de atualização**.
-   Retorna um **novo estado**, sem modificar diretamente o estado anterior (**imutabilidade**).

---

### 🔍 **Exemplo Simples de Contador**

```javascript
import { useReducer } from "react";

const estadoInicial = { contador: 0 };

function reducer(estado, action) {
	switch (action.type) {
		case "INCREMENTAR":
			return { contador: estado.contador + 1 };
		case "DECREMENTAR":
			return { contador: estado.contador - 1 };
		case "RESETAR":
			return { contador: 0 };
		default:
			return estado;
	}
}

function Contador() {
	const [estado, dispatch] = useReducer(reducer, estadoInicial);

	return (
		<div>
			<p>Contador: {estado.contador}</p>
			<button onClick={() => dispatch({ type: "INCREMENTAR" })}>+</button>
			<button onClick={() => dispatch({ type: "DECREMENTAR" })}>-</button>
			<button onClick={() => dispatch({ type: "RESETAR" })}>Resetar</button>
		</div>
	);
}
```

📌 **Explicação:**

-   O estado inicial tem o contador em `0`.
-   Cada botão **dispara uma ação** (`dispatch`) com um tipo (`type`).
-   O `reducer` **interpreta a ação** e retorna o novo estado.

---

### 🔄 **Diferenças entre `useState` e `useReducer`**

| **`useState`**                               | **`useReducer`**                                             |
| -------------------------------------------- | ------------------------------------------------------------ |
| Simples de implementar para estados simples. | Mais estruturado para estados complexos.                     |
| Atualiza o estado diretamente.               | Usa uma função `reducer` para definir regras de atualização. |
| Difícil de escalar com múltiplos estados.    | Organiza melhor a lógica com múltiplas ações.                |
| Preferido para estados simples e isolados.   | Melhor para lógicas complexas e estados compostos.           |

---

### 🏗️ **Estados Complexos**

Quando o estado envolve **múltiplas propriedades** ou **ações condicionais**, o `useReducer` organiza melhor a lógica.

#### **Exemplo com Formulário**

```javascript
import { useReducer } from "react";

const estadoInicial = {
	nome: "",
	email: "",
	senha: "",
};

function reducer(estado, action) {
	switch (action.type) {
		case "ALTERAR_CAMPO":
			return {
				...estado,
				[action.campo]: action.valor,
			};
		case "RESETAR_FORM":
			return estadoInicial;
		default:
			return estado;
	}
}

function Formulario() {
	const [estado, dispatch] = useReducer(reducer, estadoInicial);

	const handleChange = (e) => {
		dispatch({
			type: "ALTERAR_CAMPO",
			campo: e.target.name,
			valor: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(estado);
		dispatch({ type: "RESETAR_FORM" });
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" name="nome" value={estado.nome} onChange={handleChange} placeholder="Nome" />
			<input type="email" name="email" value={estado.email} onChange={handleChange} placeholder="Email" />
			<input type="password" name="senha" value={estado.senha} onChange={handleChange} placeholder="Senha" />
			<button type="submit">Enviar</button>
		</form>
	);
}
```

📌 **Explicação:**

-   O estado gerencia **vários campos** (`nome`, `email`, `senha`).
-   A ação `ALTERAR_CAMPO` atualiza o campo correto com base em `name`.
-   A ação `RESETAR_FORM` redefine o formulário.

---

### ⚠️ **Boas Práticas com useReducer**

1. **Imutabilidade:**  
   Nunca modifique o estado diretamente. Sempre retorne um novo objeto ou array.

2. **Organização de Ações:**  
   Use **strings descritivas** para `action.type` e, se possível, defina constantes para evitar erros de digitação.

    ```javascript
    const INCREMENTAR = "INCREMENTAR";
    const DECREMENTAR = "DECREMENTAR";
    ```

3. **Reducer Puro:**  
   O `reducer` deve ser uma **função pura**:

    - Não deve ter efeitos colaterais (ex: chamadas de API).
    - Não deve modificar o estado ou parâmetros diretamente.
    - Sempre retorna o novo estado com base nos argumentos.

4. **Função `init`:**  
   Use uma função de inicialização quando o estado inicial precisa de **cálculos complexos**.

    ```javascript
    function init(valor) {
    	return { contador: valor };
    }

    const [estado, dispatch] = useReducer(reducer, 0, init);
    ```

---

### 🚨 **Erros Comuns**

1. **Não tratar o `default` no `reducer`:**

    ```javascript
    switch (action.type) {
    	case "INCREMENTAR":
    		return { contador: estado.contador + 1 };
    	// ❌ Se outra ação for disparada, causará erro.
    }
    ```

    ✅ **Correto:**

    ```javascript
    default:
      return estado;
    ```

2. **Mutação do Estado:**  
   Alterar o estado diretamente sem usar o spread operator:

    ```javascript
    estado.valor = 5; // ❌ Incorreto
    return estado;
    ```

    ✅ **Correto:**

    ```javascript
    return { ...estado, valor: 5 };
    ```

---

### 📝 **Resumo**

-   O `useReducer` é ideal para **estados complexos** e lógicas com **várias ações**.
-   Funciona com uma **função pura (`reducer`)** e ações que descrevem mudanças no estado.
-   Garante a **imutabilidade** e organiza melhor o fluxo de atualização.
-   É altamente recomendado quando o `useState` começa a ficar complicado.
