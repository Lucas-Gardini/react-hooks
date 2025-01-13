// Exemplo de componente com useContext

/*
useContext é um hook que permite acessar o valor de um contexto em componentes filhos.
O hook recebe como argumento o contexto criado com createContext e retorna o valor atual do contexto.

ATENÇÃO: O estado do hook é compartilhado entre componentes, todos os componentes que utilizam o hook compartilham o mesmo estado.
*/

import React, { createContext, useContext, useState } from "react";

interface IThemeContext {
	theme: "light" | "dark";
	toggleTheme?: VoidFunction;
}

// Criação do contexto com valor padrão "light"
const ThemeContext = createContext<IThemeContext>({ theme: "light" });

// Provedor do contexto que permite alterar o tema
const ThemeProvider = ({ children }: React.PropsWithChildren) => {
	const [theme, setTheme] = useState<IThemeContext["theme"]>("light");

	// Função para alternar entre "light" e "dark"
	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Componente que consome o contexto e permite alterar o tema
const Component = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<div>
			<p>Theme: {theme}</p>
			<button onClick={toggleTheme}>Alternar Tema</button>
		</div>
	);
};

// Componente principal que envolve tudo com o Provider
const App = () => {
	return (
		<ThemeProvider>
			<Component />
		</ThemeProvider>
	);
};

export default App;
