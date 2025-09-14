import { Button } from 'primereact/button';
import {
  ByodInput,  
  ByodTextArea, 
  ByodEditor, 
  ByodMenu,
  ByodMultiSelect, 
} from '../ui';
import { EditorTextChangeEvent } from 'primereact/editor';
import { useState } from 'react';

const userGroups: any[] = [
    { label: 'Minister', value: 'MINISTER' },
    { label: 'Head of Departments', value: 'HOD' },
    { label: 'Partners', value: 'PARTNERS' },
    { label: 'Guest', value: 'GUEST' },
    { label: 'All', value: 'ALL' }
];
/**
 * The main component of the application, which renders a menu
 * on the left, and a card on the right, which contains a form
 * with various byod controls, and three buttons to save, publish,
 * or cancel the form.
 */
export const Report =()=> {
  const [value, setValue] = useState(null);
  const onTextChange =(e: EditorTextChangeEvent )=>{
     setValue(e.htmlValue as any);
  }
  const save = async(_e: any)=>{
    const response = await fetch(`${import.meta.env.VITE_AI_API}/gateways/report`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ 
            data: value
        }), 
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); 
    console.log(result);
  }
  return (
    <div className='card flex w-full flex-row gap-2'>
      <div className='flex w-15rem flex-column'>
        <ByodMenu/>
      </div>
      <div className='card flex w-full flex-column gap-2'>
        <div className='p-4 font-large font-bold text-primary-50 align-items-center justify-content-center'>Automated Report</div>
        <div className='flex flex-column w-30rem'>
          <ByodInput label={ 'Title'}/>
          <ByodTextArea/>
          <ByodMultiSelect label={'Reporting Groups'} options ={ userGroups }/>
        </div>
        <ByodEditor onTextChange={ onTextChange}/>
        <div className="flex align-content-center align-items-center gap-2">
            <Button onClick ={ save } label="Save" className="p-3 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
            <Button label="Publish" className="p-3 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
            <Button label="Cancel" className="p-3 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
        </div>
      </div>
    </div>
  )
}

export default Report
