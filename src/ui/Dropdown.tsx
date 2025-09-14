
import { useState } from "react";
import { IDropdownProps } from "./Type";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";



export const ByodSelect =({ label, placeholder, options }: IDropdownProps )=> {
    const [selected, setSelected] = useState<any[] | null>(null);

    return (
        <div className="flex w-full flex-column justify-content-start field">
            <label>{label}</label>
            <Dropdown
                value={selected} 
                onChange={(e: DropdownChangeEvent) => setSelected(e.value)} 
                options={ options} 
                optionLabel="label" 
                placeholder={placeholder }
                className="w-full" 
            />
        </div>
    );
}
        
