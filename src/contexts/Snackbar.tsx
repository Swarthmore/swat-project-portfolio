import {createContext, useState} from "react";

type Severity = "error" | "warning" | "info" | "success";

interface Snack {
    type: Severity,
    msg: string,
    open: boolean
}

export const SnackbarContext = createContext<{ snack: Snack, setSnack: any }>(
    {
        snack: { type: "error", msg: "", open: false },
        setSnack: () => {}
    }
);

export default function({ children }: { children: JSX.Element }) {
    const [snack, setSnack] = useState<Snack>({
        type: "error",
        msg: "",
        open: false
    });

    return <SnackbarContext.Provider value={{ snack, setSnack}}>
        {children}
    </SnackbarContext.Provider>
}