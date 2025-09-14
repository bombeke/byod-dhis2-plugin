
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

export const ByodTextArea =()=>{
    const [value, setValue] = useState<string>('');

    return (
        <div className="flex w-full flex-column mb-1 gap-1 field">
            <label htmlFor="description">Description</label> 
            <div className="p-inputgroup flex-1 flex h-20rem">
                <InputTextarea 
                    className="flex h-full bg-white" 
                    value={value} 
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} 
                    rows={2} 
                    cols={10} 
                />
            </div>
        </div>
    )
}
        
