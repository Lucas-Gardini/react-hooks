### 🎯 **Hooks Customizados (Custom Hooks) no React**

**Hooks customizados** são funções em React que permitem **reutilizar lógica de estado e efeitos** em diferentes componentes. Eles seguem a mesma estrutura dos hooks nativos (`useState`, `useEffect`, etc.), mas são **criados pelo desenvolvedor** para encapsular e abstrair lógicas comuns, deixando o código mais **limpo**, **organizado** e **reutilizável**.

---

### 📦 **Estrutura de um Hook Customizado**

```javascript
import { useState, useEffect } from "react";

function useNomeDoHook() {
	// Lógica reutilizável
	const [estado, setEstado] = useState(valorInicial);

	useEffect(() => {
		// Efeito colateral
	}, []);

	return [estado, setEstado]; // ou qualquer valor/objeto
}
```

**Regras importantes:**

1. O nome deve começar com **`use`** (ex.: `useContador`).
2. Pode usar **outros hooks** internos (`useState`, `useEffect`, etc.).
3. Deve ser **puro** e não manipular diretamente o DOM sem necessidade.

---

### 🚀 **Benefícios de Hooks Customizados**

1. **Reutilização de lógica:** Encapsula lógica repetitiva e evita código duplicado.
2. **Organização:** Deixa componentes mais enxutos.
3. **Testabilidade:** São mais fáceis de testar, pois são funções puras.
4. **Composição:** Permite combinar múltiplos hooks em uma única lógica.

---

### 📚 **Exemplos Práticos**

---

### 1. **Hook de Contador (`useContador`)**

Encapsula a lógica de incrementar, decrementar e resetar um contador.

```javascript
import { useState } from "react";

function useContador(valorInicial = 0) {
	const [contador, setContador] = useState(valorInicial);

	const incrementar = () => setContador((prev) => prev + 1);
	const decrementar = () => setContador((prev) => prev - 1);
	const resetar = () => setContador(valorInicial);

	return { contador, incrementar, decrementar, resetar };
}

export default useContador;
```

📌 **Uso no Componente:**

```javascript
import useContador from "./useContador";

function Contador() {
	const { contador, incrementar, decrementar, resetar } = useContador(5);

	return (
		<div>
			<h2>Contador: {contador}</h2>
			<button onClick={incrementar}>+</button>
			<button onClick={decrementar}>-</button>
			<button onClick={resetar}>Resetar</button>
		</div>
	);
}
```

✅ **Explicação:**

-   O hook `useContador` encapsula toda a lógica.
-   O componente fica **limpo** e **enxuto**.

---

### 2. **Hook de Detecção de Tamanho da Tela (`useWindowSize`)**

Monitora o tamanho da janela e retorna suas dimensões.

```javascript
import { useState, useEffect } from "react";

function useWindowSize() {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return size;
}

export default useWindowSize;
```

📌 **Uso no Componente:**

```javascript
import useWindowSize from "./useWindowSize";

function Tela() {
	const { width, height } = useWindowSize();

	return (
		<div>
			<p>Largura: {width}px</p>
			<p>Altura: {height}px</p>
		</div>
	);
}
```

✅ **Explicação:**

-   O hook encapsula o **evento de resize** e retorna as dimensões.
-   Evita duplicar esse comportamento em vários componentes.

---

### 3. **Hook de Fetch de Dados (`useFetch`)**

Simplifica chamadas de API.

```javascript
import { useState, useEffect } from "react";

function useFetch(url) {
	const [dados, setDados] = useState(null);
	const [loading, setLoading] = useState(true);
	const [erro, setErro] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetch(url)
			.then((res) => res.json())
			.then((data) => setDados(data))
			.catch((error) => setErro(error))
			.finally(() => setLoading(false));
	}, [url]);

	return { dados, loading, erro };
}

export default useFetch;
```

📌 **Uso no Componente:**

```javascript
import useFetch from "./useFetch";

function Usuarios() {
	const { dados, loading, erro } = useFetch("https://jsonplaceholder.typicode.com/users");

	if (loading) return <p>Carregando...</p>;
	if (erro) return <p>Erro ao carregar dados!</p>;

	return (
		<ul>
			{dados.map((usuario) => (
				<li key={usuario.id}>{usuario.name}</li>
			))}
		</ul>
	);
}
```

✅ **Explicação:**

-   O hook `useFetch` centraliza a lógica de **requisições HTTP**.
-   Facilita o uso em diferentes componentes sem duplicar a lógica.

---

### 🎯 **Boas Práticas com Hooks Customizados**

1. **Nomeie com `use`:**  
   Ex.: `useContador`, `useAuth`. Isso ajuda o React a identificar que é um hook.

2. **Composição de Hooks:**  
   Combine hooks nativos (`useState`, `useEffect`) ou outros hooks customizados.

3. **Imutabilidade:**  
   Evite alterar estados diretamente. Use sempre o **setter** apropriado.

4. **Evite Hooks Condicionais:**  
   Não coloque hooks dentro de **condicionais** ou **loops**. Eles devem ser executados na mesma ordem.

5. **Retorne apenas o necessário:**  
   Retorne objetos claros ou arrays com os valores necessários.

---

### 🚨 **Erros Comuns**

1. **Não usar o prefixo `use`:**  
   ❌ `contadorHook()` → ✅ `useContador()`

2. **Executar hooks dentro de condições:**

    ```javascript
    if (condicao) {
    	useEffect(() => {}); // ⚠️ Inválido!
    }
    ```

3. **Não limpar efeitos colaterais:**  
   Falhar em remover **event listeners** ou **intervalos** pode causar **vazamentos de memória**.

4. **Retornar dados desorganizados:**  
   Retorne objetos ou arrays organizados, facilitando o uso.

---

### 📝 **Resumo**

-   Hooks customizados permitem **abstrair** e **reutilizar** lógicas complexas.
-   Seguem a mesma estrutura dos hooks nativos, sempre começando com **`use`**.
-   Melhoram a **manutenção**, **leitura** e **organização** do código.
-   São ideais para lógica de **estado**, **efeitos colaterais** e **eventos globais**.
