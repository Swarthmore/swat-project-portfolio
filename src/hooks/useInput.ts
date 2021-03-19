import { useState } from "react";

export default function useInput(initialValue: string) {

    const [value, setValue] = useState(initialValue)

    return {
        value,
        setValue: () => setValue,
        reset: (val: string|undefined) => val ? setValue(val) : setValue(""),
        bind: {
            value,
            onChange: (e: any) => {
                // If event.target is set, we can assume the field is a text input with a value property
                // If event.target is not set, check to see if e is a moment object. If it is a moment object
                // that means we can use e.toString() to get the date
                e.target 
                    ? setValue(e.target.value) 
                        : Date.parse(e)
                            ? setValue(e.toISOString()) : null
            }
        }
    }

}