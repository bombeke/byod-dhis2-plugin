import { Button } from 'primereact/button';
import {
  ByodInput,  
  ByodTextArea, 
  ByodEditor, 
  ByodSelect, 
  ByodMenu 
} from './ui';

/**
 * The main component of the application, which renders a menu
 * on the left, and a card on the right, which contains a form
 * with various byod controls, and three buttons to save, publish,
 * or cancel the form.
 */
const App =()=> {
  return (
    <div className='card flex w-full flex-row gap-2'>
      <div className='flex w-15rem flex-column'>
        <ByodMenu/>
      </div>
      <div className='card flex w-full flex-column gap-2'>
        <div className='p-4 font-large font-bold text-primary-50 align-items-center justify-content-center'>Automated Report</div>
        <ByodInput/>
        <ByodTextArea/>
        <ByodEditor/>
        <ByodSelect/>
        <div className="flex align-content-center align-items-center gap-2">
            <Button label="Save" className="p-3 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
            <Button label="Publish" className="p-3 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
            <Button label="Cancel" className="p-3 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
        </div>
      </div>
    </div>
  )
}

export default App
