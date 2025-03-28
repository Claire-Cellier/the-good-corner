import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Basket = {
	total: number;
	setTotal: React.Dispatch<React.SetStateAction<number>>;
};

const BasketContext = createContext<Basket | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
	const [total, setTotal] = useState<number>(0);

	return (
		<BasketContext.Provider
			value={{
				total,
				setTotal,
			}}
		>
			{children}
		</BasketContext.Provider>
	);
}

export const useBasket = () => {
	const context = useContext(BasketContext);
	if (!context) {
		throw new Error("useBasket must be used within a SearchProvider");
	}
	return context;
};
