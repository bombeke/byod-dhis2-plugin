
import { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";

export const AiPrompt=({ visible, reset, getData }: any)=> {
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState('');
  const questions = [
      { name: 'Text', code: 'TEXT' },
      { name: 'Chart', code: 'CHART' },
      { name: 'Map', code: 'MAP' },
      { name: 'Table', code: 'TABLE' },
      { name: 'AI Image', code: 'AIIMAGE' }
  ];
  const onClick =()=>{
    getData({
        selected: selected,
        value: value
    });
    setValue('');
    setSelected(null);
  }
    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; reset(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="question" className="text-primary-50 font-semibold">
                                AI Type
                            </label>
                            <Dropdown id="question" value={selected} onChange={(e) => setSelected(e.value)} options={questions} optionLabel="name" 
                placeholder="Select AI type" className="w-full md:w-14rem" />
                        </div>                        
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="query" className="text-primary-50 font-semibold">
                                Query
                            </label>
                            <InputTextarea id="query" placeholder="Message to send for querying" className="bg-white-alpha-20 border-none p-3 text-primary-50" value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />
                        </div>
                        
                        <div className="flex align-items-center gap-2">
                            <Button label="Retrieve" onClick={(e) => {hide(e); onClick(); return; }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
        