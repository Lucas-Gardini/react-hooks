O `useMemo` é um **hook de otimização de performance** do React. Ele é usado para **memorizar valores calculados** de forma que esses valores só sejam recalculados quando suas dependências mudarem. Isso evita a execução desnecessária de cálculos pesados ou funções puras em cada renderização.

---

### 📦 **Sintaxe Básica**

```javascript
const valorMemorizado = useMemo(() => {
	// Cálculo ou função pesada
	return resultado;
}, [dependências]);
```

-   **Função de cálculo:** É executada apenas quando as **dependências** mudam.
-   **Array de dependências:** Define quando o valor será recalculado.
-   **valorMemorizado:** Resultado armazenado até que uma dependência mude.

---

### ⚙️ **Quando Usar o `useMemo`**

1. **Cálculos Pesados:**  
   Otimizar funções que demandam muitos recursos.

2. **Evitar Recriação de Objetos/Arrays:**  
   Evita que objetos/arrays sejam recriados a cada renderização, o que pode causar renders desnecessários em componentes filhos.

3. **Estabilidade de Referência:**  
   Garante que referências de objetos ou arrays sejam mantidas entre renders.

---

### 🔍 **Exemplo Simples com Cálculo Pesado**

```javascript
import { useState, useMemo } from "react";

function Fatorial() {
	const [numero, setNumero] = useState(1);
	const [contador, setContador] = useState(0);

	const calcularFatorial = (n) => {
		console.log("Calculando fatorial...");
		if (n <= 0) return 1;
		return n * calcularFatorial(n - 1);
	};

	const fatorial = useMemo(() => calcularFatorial(numero), [numero]);

	return (
		<div>
			<h2>
				Fatorial de {numero}: {fatorial}
			</h2>
			<button onClick={() => setContador(contador + 1)}>Incrementar: {contador}</button>
			<input type="number" value={numero} onChange={(e) => setNumero(Number(e.target.value))} />
		</div>
	);
}
```

📌 **Explicação:**

-   O cálculo do **fatorial** só será refeito quando o valor de `numero` mudar.
-   Alterar o `contador` **não** dispara o cálculo novamente, economizando processamento.

---

### 🏗️ **Exemplo com Objetos (Evitar Renders Desnecessários)**

Sem `useMemo`, um objeto recriado pode forçar renderizações desnecessárias.

```javascript
import { useState, useMemo } from "react";

function Lista() {
	const [numero, setNumero] = useState(0);
	const [dark, setDark] = useState(false);

	const estiloTema = useMemo(
		() => ({
			backgroundColor: dark ? "#333" : "#FFF",
			color: dark ? "#FFF" : "#000",
		}),
		[dark]
	);

	return (
		<div style={estiloTema}>
			<input type="number" value={numero} onChange={(e) => setNumero(Number(e.target.value))} />
			<button onClick={() => setDark(!dark)}>Alternar Tema</button>
		</div>
	);
}
```

📌 **Explicação:**

-   O objeto `estiloTema` só será recriado quando `dark` mudar.
-   Sem o `useMemo`, o objeto seria recriado em **toda renderização**, afetando o desempenho.

---

### 🔄 **Diferença entre `useMemo` e `useCallback`**

| **`useMemo`**                           | **`useCallback`**                    |
| --------------------------------------- | ------------------------------------ |
| Memoriza o **resultado de uma função**. | Memoriza a **própria função**.       |
| Retorna um **valor**.                   | Retorna uma **função**.              |
| Usado para **cálculos complexos**.      | Usado para **callbacks otimizados**. |

🔎 **Exemplo:**

```javascript
const valor = useMemo(() => calculoPesado(), [dependências]); // Memoriza valor
const funcao = useCallback(() => fazAlgo(), [dependências]); // Memoriza função
```

---

### ⚠️ **Boas Práticas com `useMemo`**

1. **Evite uso excessivo:**  
   Só use quando o cálculo for **pesado** ou quando evitar renderizações desnecessárias for **essencial**.

2. **Dependências corretas:**  
   Inclua todas as variáveis usadas dentro da função de cálculo no array de dependências.

3. **Para valores, não funções:**  
   Use `useMemo` para memorizar **valores** e `useCallback` para **funções**.

4. **Função pura:**  
   A função dentro de `useMemo` deve ser **pura**, ou seja, sem efeitos colaterais.

---

### 🚨 **Erros Comuns**

1. **Usar `useMemo` para tudo:**  
   Memorizar cálculos simples ou que não impactam a performance é **desnecessário** e pode prejudicar mais do que ajudar.

2. **Esquecer dependências:**  
   Não incluir variáveis no array de dependências pode causar **bugs silenciosos**.

3. **Funções com efeitos colaterais:**  
   **Evite** alterar estados ou executar efeitos dentro do `useMemo`.

    ❌ **Errado:**

    ```javascript
    useMemo(() => {
    	setValor(10); // Não faça isso!
    }, []);
    ```

4. **Confundir com `useCallback`:**  
   Usar `useMemo` para memorizar funções em vez de `useCallback`.

---

### 📝 **Resumo**

-   **`useMemo`** memoriza o **resultado de cálculos** pesados ou valores complexos.
-   **Evita re-renderizações desnecessárias** ao garantir estabilidade de valores.
-   Deve ser usado com **critério**, apenas quando há impacto real na performance.
-   Trabalha com **valores**, enquanto o `useCallback` memoriza **funções**.
