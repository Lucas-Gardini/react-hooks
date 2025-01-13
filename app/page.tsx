"use client";

import UseCallback from "@/components/useCallback";
import UseContext from "@/components/useContext";
import UseEffect from "@/components/useEffect";
import UseMemo from "@/components/useMemo";
import UseState from "@/components/useState";
import UseRef from "@/components/useRef";
import UseReducer from "@/components/useReducer";
import UseLayoutEffect from "@/components/useLayoutEffect";
import UseCustom from "@/components/useCustom";
import UseCustomEdit from "@/components/useCustomEdit";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 items-center sm:items-start">
				<div>
					<h1 className="text-4xl font-bold">useState</h1>
					<UseState />
				</div>

				<div>
					<h1 className="text-4xl font-bold">useEffect</h1>
					<UseEffect />
				</div>

				<div>
					<h1 className="text-4xl font-bold">useMemo</h1>
					<UseMemo />
				</div>

				<div>
					<h1 className="text-4xl font-bold">useCallback</h1>
					<UseCallback />
				</div>

				<div>
					<h1 className="text-4xl font-bold">useContext</h1>
					<UseContext />
				</div>

				<div>
					<h1 className="text-4xl font-bold">useCustom</h1>
					<UseCustom />
				</div>

				<div>
					<h1 className="text-4xl font-bold">useRef</h1>
					<UseRef />
				</div>

				<div>
					<h1 className="text-4xl font-bold">useReducer</h1>
					<UseReducer />
				</div>

				<div>
					<h1 className="text-4xl font-bold">useLayoutEffect</h1>
					<UseLayoutEffect />
				</div>

				<div>
					<h1 className="text-4xl font-bold">useCustomEdit</h1>
					<UseCustomEdit />
				</div>

				<div>&nbsp;</div>
			</main>
		</div>
	);
}
