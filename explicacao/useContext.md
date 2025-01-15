O `useContext` é um **hook do React** que permite acessar o valor de um **Contexto** sem a necessidade de usar o componente `<Context.Consumer>`. Ele simplifica o compartilhamento de dados entre componentes em diferentes níveis da árvore de componentes, evitando o problema conhecido como **prop drilling** (passar props de componente em componente até o destino final).

---

### 📦 **Sintaxe Básica**

```javascript
const valor = useContext(NomeDoContexto);
```

-   **`NomeDoContexto`**: O contexto previamente criado com `React.createContext()`.
-   **`valor`**: O valor atual do contexto que pode ser acessado diretamente.

---

### ⚙️ **Como Funciona o Context API**

1. **Criação do Contexto:**  
   Usa-se `React.createContext()` para criar o contexto.

2. **Provedor (`Provider`):**  
   Componente que envolve outros componentes e **fornece** o valor para eles.

3. **Consumidor (`useContext`):**  
   Hook que permite acessar diretamente o valor fornecido pelo contexto.

---

### 📚 **Exemplo Prático Completo**

---

#### 1. **Criando o Contexto**

```javascript
import { createContext } from "react";

// Criação do contexto
export const TemaContexto = createContext();
```

---

#### 2. **Fornecendo o Contexto (`Provider`)**

```javascript
import { useState } from "react";
import { TemaContexto } from "./TemaContexto";

function TemaProvider({ children }) {
	const [tema, setTema] = useState("claro");

	const alternarTema = () => {
		setTema((temaAtual) => (temaAtual === "claro" ? "escuro" : "claro"));
	};

	return <TemaContexto.Provider value={{ tema, alternarTema }}>{children}</TemaContexto.Provider>;
}

export default TemaProvider;
```

📌 **Explicação:**

-   O `TemaProvider` usa o **Provider** para disponibilizar o valor (`tema` e `alternarTema`) para os componentes filhos.
-   Qualquer componente dentro do `TemaProvider` poderá acessar esses valores.

---

#### 3. **Consumindo o Contexto com `useContext`**

```javascript
import { useContext } from "react";
import { TemaContexto } from "./TemaContexto";

function BotaoTema() {
	const { tema, alternarTema } = useContext(TemaContexto);

	return <button onClick={alternarTema}>Alternar para tema {tema === "claro" ? "escuro" : "claro"}</button>;
}

export default BotaoTema;
```

📌 **Explicação:**

-   O componente `BotaoTema` acessa diretamente o valor do contexto `TemaContexto` usando `useContext`.
-   O botão altera o tema entre **claro** e **escuro**.

---

#### 4. **Usando o Provider no Componente Raiz**

```javascript
import TemaProvider from "./TemaProvider";
import BotaoTema from "./BotaoTema";

function App() {
	return (
		<TemaProvider>
			<div>
				<h1>Exemplo de useContext</h1>
				<BotaoTema />
			</div>
		</TemaProvider>
	);
}

export default App;
```

📌 **Explicação:**

-   O componente `App` está envolvido pelo `TemaProvider`.
-   Assim, qualquer componente dentro do `TemaProvider` pode acessar o contexto.

---

### 🎯 **Quando Usar o `useContext`**

1. **Gerenciar temas globais (claro/escuro).**
2. **Autenticação de usuários (login/logout).**
3. **Preferências de idioma (i18n).**
4. **Configurações globais da aplicação.**
5. **Gerenciamento de carrinho de compras.**

---

### 🔄 **Comparação com `props`**

| **`props`**                                          | **`useContext`**                        |
| ---------------------------------------------------- | --------------------------------------- |
| Os dados são passados **explicitamente**.            | Os dados são acessados **globalmente**. |
| Requer passar props de **componente em componente**. | **Evita o prop drilling**.              |
| Melhor para **dados locais**.                        | Melhor para **dados globais**.          |

📌 **Exemplo de Prop Drilling:**

```javascript
<Pai>
	<Filho>
		<Neto>
			<Bisneto valor="tema" />
		</Neto>
	</Filho>
</Pai>
```

✅ **Com `useContext`:**  
O valor pode ser acessado diretamente pelo **`Bisneto`**, sem passar por `Pai` → `Filho` → `Neto`.

---

### ⚠️ **Boas Práticas com `useContext`**

1. **Não Abuse do Contexto:**  
   Use para **dados globais**. Para dados locais, prefira **`useState`** ou **`useReducer`**.

2. **Organize os Contextos:**  
   Para múltiplos contextos, crie um arquivo específico para gerenciá-los.

3. **Evite Re-renderizações Desnecessárias:**  
   Componentes que usam o contexto serão re-renderizados quando o valor mudar. Para otimizar, use **`useMemo`**.

4. **Divida o Contexto:**  
   Crie **contextos separados** para temas, autenticação, etc.

---

### 🚨 **Erros Comuns**

1. **Usar o `useContext` fora do `Provider`:**

    ❌ **Errado:**

    ```javascript
    const { tema } = useContext(TemaContexto); // Erro se não estiver dentro do Provider
    ```

    ✅ **Correto:**  
    Envolver o componente com o **Provider** antes de usar.

2. **Passar dados complexos sem `useMemo`:**

    ❌ **Errado:**

    ```javascript
    <TemaContexto.Provider value={{ tema, alternarTema }}>
    ```

    ✅ **Correto:**

    ```javascript
    const valor = useMemo(() => ({ tema, alternarTema }), [tema]);
    <TemaContexto.Provider value={valor}>
    ```

3. **Criar Contextos Desnecessários:**  
   Nem todo dado precisa de um contexto. Prefira `props` para dados **locais**.

---

### 📝 **Resumo**

-   **`useContext`** permite acessar dados globais de forma simples, evitando o **prop drilling**.
-   Deve ser usado junto com um **Provider** que compartilha o valor.
-   É ideal para **temas**, **autenticação**, **idiomas** e **configurações globais**.
-   Cuidado com **re-renderizações desnecessárias** e **uso excessivo**.
