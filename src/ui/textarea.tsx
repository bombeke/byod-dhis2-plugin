
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

export const ByodTextArea =()=>{
    const [value, setValue] = useState<string>('');

    return (
        <div className="flex w-full flex-column mb-1 gap-2 field">
          <label htmlFor="description">Description</label> 
        <div className="p-inputgroup flex-1">

            <InputTextarea value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} rows={5} cols={30} />
	</div>
        </div>
    )
}
        
