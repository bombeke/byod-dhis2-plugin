
import { useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { AiPrompt } from './dialog';
const AiButton = () => {
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
      <AiPrompt visible={visible} reset ={reset} />
      </>
    );
  };
export const ByodEditor =()=> {
    const [text, setText] = useState<string>('');
    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
                <button className="ql-image" aria-label="Image"></button>
                <button className="ql-video" aria-label="Video"></button>
                <AiButton/>
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
                    onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue)} 
                    headerTemplate={header}
                    style={{ height: '320px' }} 
                />
            </div>
        </div>
    )
}
        
