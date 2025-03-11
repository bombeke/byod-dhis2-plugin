
import { useState } from "react";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

interface UserGroup {
    name: string;
    code: string;
}

export const ByodSelect =()=> {
    const [selected, setSelected] = useState<UserGroup[] | null>(null);
    const userGroups: UserGroup[] = [
        { name: 'Minister', code: 'MINISTER' },
        { name: 'Head of Departments', code: 'HOD' },
        { name: 'Partners', code: 'PARTNERS' },
        { name: 'Guest', code: 'GUEST' },
        { name: 'All', code: 'ALL' }
    ];

    return (
        <div className="flex w-full justify-content-center field">
            <MultiSelect 
                value={selected} 
                onChange={(e: MultiSelectChangeEvent) => setSelected(e.value)} 
                options={userGroups} 
                display="chip" 
                optionLabel="name" 
                placeholder="Select User Groups" 
                className="w-full" 
            />
        </div>
    );
}
        
