
import { useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { ISelectProps } from "./Type";



export const ByodMultiSelect =({label, placeholder, options }: ISelectProps )=> {
    const [selected, setSelected] = useState<any[] | null>(null);

    return (
        <div className="flex w-full flex-column justify-content-start gap-1 field ">
            <label>{label}</label>
            <div className="p-inputgroup flex-1 w-full">
                <MultiSelect 
                    value={selected} 
                    onChange={(e: MultiSelectChangeEvent) => setSelected(e.value)} 
                    options={ options} 
                    display="chip" 
                    optionLabel="name" 
                    placeholder={placeholder }
                    className="w-full" 
                />
            </div>
        </div>
    );
}
        
