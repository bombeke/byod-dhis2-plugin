
import { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { AiPrompt } from './dialog';
const AiButton = ({ getData }: any) => {
    const [visible, setVisible] = useState<boolean>(false);
    const handleClick = () => {
        setVisible(true)
    };
    const reset = () => {
        setVisible(false)
    };
    return (
        <>
            <button id="custom-button" onClick={handleClick}>AI
            </button>
            <AiPrompt visible={visible} reset ={reset} getData={getData} />
        </>
    );
  };
export const ByodEditor =()=> {
    const [text, setText] = useState<string>('');
    const getData = ({ value }: any) => {
        console.log("value:",value);
        setText(text + value);
    }
    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
                
                <select className='ql-font' aria-label="Font">
                    <option  value= 'serif' aria-label="Serif" />
                    <option  value= 'monospace'  aria-label="monospace"/>
                </select>
                <button className="ql-list" value="ordered" aria-label="Ordered List"></button>
                <button className="ql-list" value="bullet" aria-label="Unordered List"></button>
                <button className="ql-image" aria-label="Image"></button>
                <button className="ql-video" aria-label="Video"></button>
                <button className="ql-table-container" aria-label="table"></button>
                <AiButton getData={ getData }/>
            </span>
        );
    };

    const header = renderHeader();

    return (
        <div className="flex w-full flex-column mb-1 gap-2 field">
            <label htmlFor="narrative">Narrative</label> 
            <div className="p-inputgroup flex-1 flex flex-column w-full">
                <Editor 
                    value={text} 
                    onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue as any)} 
                    headerTemplate={header}
                    style={{ height: '320px' }} 
                />
            </div>
        </div>
    )
}
        
