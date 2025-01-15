O `useState` é um **hook fundamental do React** que permite adicionar **estado** a componentes funcionais. Antes da introdução dos hooks na versão 16.8 do React, o estado era gerenciado apenas em **componentes de classe**. Com o `useState`, tornou-se possível gerenciar estados de forma simples e direta em componentes funcionais.

---

### 📦 **Sintaxe Básica**

```javascript
const [estado, setEstado] = useState(valorInicial);
```

-   **`estado`**: A variável que armazena o valor atual do estado.
-   **`setEstado`**: A função que atualiza o valor do estado.
-   **`valorInicial`**: O valor inicial que será atribuído ao estado na primeira renderização.

---

### 🔍 **Exemplo Simples**

```javascript
import { useState } from "react";

function Contador() {
	const [contador, setContador] = useState(0);

	return (
		<div>
			<p>Você clicou {contador} vezes</p>
			<button onClick={() => setContador(contador + 1)}>Clique aqui</button>
		</div>
	);
}
```

📌 **Explicação:**

-   O estado `contador` é inicializado com o valor `0`.
-   Ao clicar no botão, a função `setContador` é chamada, incrementando o valor do contador.
-   A cada atualização, o componente é **re-renderizado** com o novo valor.

---

### ⚙️ **Atualização de Estado**

1. **Atualização Direta:**  
   Usado quando a nova atualização não depende do valor anterior.

    ```javascript
    setContador(10); // Define o contador diretamente para 10
    ```

2. **Atualização com Função:**  
   Usado quando a atualização depende do valor anterior.

    ```javascript
    setContador((prevContador) => prevContador + 1);
    ```

📌 **Por que isso é importante?**  
Se múltiplas atualizações de estado forem feitas rapidamente, usar o valor anterior garante que todas as atualizações sejam aplicadas corretamente.

---

### 🔄 **Estado com Tipos Diferentes**

O `useState` aceita **qualquer tipo de valor** como estado inicial:

1. **String**

    ```javascript
    const [nome, setNome] = useState("João");
    ```

2. **Booleano**

    ```javascript
    const [ativo, setAtivo] = useState(false);
    ```

3. **Objeto**

    ```javascript
    const [usuario, setUsuario] = useState({ nome: "Maria", idade: 25 });

    // Atualizando parte do objeto
    setUsuario((prevUsuario) => ({ ...prevUsuario, idade: 26 }));
    ```

4. **Array**

    ```javascript
    const [itens, setItens] = useState([]);

    // Adicionando um item
    setItens((prevItens) => [...prevItens, "Novo item"]);
    ```

📌 **Observação:** Ao trabalhar com objetos ou arrays, é importante usar o **spread operator (`...`)** para preservar os dados anteriores e evitar sobrescrever o estado.

---

### 🏗️ **Estado Inicial com Função**

Se o cálculo do valor inicial for **pesado**, podemos passar uma **função** para inicializar o estado. Isso evita que o cálculo seja executado em cada renderização.

```javascript
const [valor, setValor] = useState(() => {
	console.log("Calculando valor inicial...");
	return 100;
});
```

📌 **Explicação:**  
A função só será executada **uma vez**, durante a montagem do componente.

---

### 📚 **Exemplos Práticos**

#### 1. **Toggle (Ativar/Desativar)**

```javascript
function ToggleButton() {
	const [ativo, setAtivo] = useState(false);

	return <button onClick={() => setAtivo((prevAtivo) => !prevAtivo)}>{ativo ? "Desativar" : "Ativar"}</button>;
}
```

📌 **Explicação:** O botão alterna entre os estados **ativo** e **inativo**.

---

#### 2. **Manipulação de Formulário**

```javascript
function Formulario() {
	const [nome, setNome] = useState("");

	const handleChange = (e) => setNome(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`Nome enviado: ${nome}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" value={nome} onChange={handleChange} />
			<button type="submit">Enviar</button>
		</form>
	);
}
```

📌 **Explicação:**

-   O input está **controlado** pelo estado `nome`.
-   Ao enviar, o valor do input é exibido em um `alert`.

---

#### 3. **Gerenciando Listas**

```javascript
function ListaDeTarefas() {
	const [tarefas, setTarefas] = useState([]);
	const [tarefa, setTarefa] = useState("");

	const adicionarTarefa = () => {
		setTarefas((prev) => [...prev, tarefa]);
		setTarefa("");
	};

	return (
		<div>
			<input type="text" value={tarefa} onChange={(e) => setTarefa(e.target.value)} />
			<button onClick={adicionarTarefa}>Adicionar</button>
			<ul>
				{tarefas.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
}
```

📌 **Explicação:**  
Permite adicionar tarefas a uma lista, com atualização do array de forma **imutável**.

---

### ⚠️ **Boas Práticas com useState**

1. **Atualização Imutável:**  
   Sempre preserve o estado anterior ao atualizar arrays ou objetos.

2. **Evitar Estados Complexos Demais:**  
   Divida estados complexos em múltiplos `useState` para melhor manutenção.

3. **Função no useState:**  
   Use funções para calcular o estado inicial, se for um cálculo pesado.

4. **Use Dependências Corretamente:**  
   Se o valor do estado for usado em hooks como `useEffect`, garanta que ele esteja nas dependências.

---

### 🚨 **Erros Comuns**

1. **Mutação Direta de Objetos/Arrays:**

    ```javascript
    const [lista, setLista] = useState([1, 2, 3]);
    lista.push(4); // ⚠️ Não fazer isso!
    setLista(lista); // Não dispara re-renderização
    ```

    ✅ **Correto:**

    ```javascript
    setLista((prevLista) => [...prevLista, 4]);
    ```

2. **Atualização de Estado em Loops/Sincronizações:**  
   Evite atualizar o estado diretamente dentro de loops ou hooks sem controle.

3. **Ignorar o Valor Anterior:**  
   Em atualizações baseadas no estado anterior, sempre use a função de atualização.

---

### 📝 **Resumo**

-   **`useState`** permite adicionar estado a componentes funcionais.
-   O estado pode ser de qualquer tipo: **primitivo, objeto ou array**.
-   **Nunca** mutar diretamente o estado. Use o **spread operator** ou funções de atualização.
-   Para estados dependentes de valores anteriores, utilize a **função de atualização**.
-   É o hook mais básico e essencial para criar componentes **dinâmicos e interativos**.
