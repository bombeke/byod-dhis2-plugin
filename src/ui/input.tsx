
import { useState } from "react";
import { InputText } from "primereact/inputtext";

export const ByodInput =()=> {
    const [value, setValue] = useState<string>('');

    return (
        <div className="flex w-full flex-column mb-1 gap-2 field">
          <label htmlFor="title">Title</label>
        <div className="p-inputgroup flex-1">
            <InputText value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
        </div>
	</div> 
   )
}
        
