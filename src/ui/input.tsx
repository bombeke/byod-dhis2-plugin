
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { IInputProps } from "./Type";

export const ByodInput =({ label }: IInputProps )=> {
    const [value, setValue] = useState<string>('');

    return (
        <div className="flex w-full flex-column gap-1 justify-content-start field">
            <label>{label}</label>
            <div className="p-inputgroup flex-1 w-full">
                <InputText 
                  value={value} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} 
                />
            </div>
      </div> 
   )
}
        
