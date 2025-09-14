import { Button } from 'primereact/button';
import {
  ByodInput,  
  ByodTextArea, 
  ByodSelect, 
  ByodMenu 
} from '../ui';
import { useState } from 'react';

const patientStage: any[] = [
    { label: 'Registration', value: 'REGISTRATION' },
    { label: 'Triage', value: 'TRIAGE' },
    { label: 'Diagnosis', value: 'DIAGNOSIS' },
    { label: 'Lab Request', value: 'LAB_REQUEST' },
    { label: 'Lab Result', value: 'LAB_RESULT' },
    { label: 'Pharmacy/Prescription', value: 'PRESCRIPTION' }
];

const idType : any[] =[
    { label: 'National ID', value:'NATIONAL_ID'},
    { label: 'Passport', value: 'PASSPORT'},
    { label: 'Drivers Licence', value: 'DRIVERS_LICENCE'},
    { label: 'Other', value: 'OTHER'}
]
/**
 * The main component of the application, which renders a menu
 * on the left, and a card on the right, which contains a form
 * with various byod controls, and three buttons to save, publish,
 * or cancel the form.
 */
export const Tracker =()=> {
  const [value, _setValue] = useState(null);
  const save = async(_e: any)=>{
    const response = await fetch(`${import.meta.env.VITE_AI_API}/gateway/report`, {
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
        <div className='p-4 font-large font-bold text-primary-50 align-items-center justify-content-center'>Register</div>
        <ByodSelect label={'Identity Type'} options={idType} />
        <ByodInput label={'ID'}/>
        <ByodSelect  label={'Patient Service'} options={patientStage} />
        <ByodTextArea />
        <div className="flex align-content-center align-items-center gap-2">
            <Button onClick ={ save } label="Save" className="p-3 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
            <Button label="Cancel" className="p-3 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
        </div>
      </div>
    </div>
  )
}

export default Tracker
