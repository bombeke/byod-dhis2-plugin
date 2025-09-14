import { DropdownProps } from "primereact/dropdown";
import { MultiSelectProps } from "primereact/multiselect";


export interface IInputProps{
    label: string | null;
    placeholder?: string;
}

export interface ISelectProps extends MultiSelectProps {
    label?:  string | null;
}
export interface IDropdownProps extends DropdownProps {
    label?:  string | null;
}

export interface AIProps {
    interpret?: string | null;
}