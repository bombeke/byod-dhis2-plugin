
import { useEffect, useRef, useState } from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { AiPrompt } from './dialog';
import { AiPromptChartArea } from "./ChatArea";
import { Button } from "primereact/button";
import Quill from "quill";
import  QuillResize from 'quill-resize-module';

Quill.register('modules/resize',QuillResize)

export const AiButton = ({ getData }: any) => {
    const [visible, setVisible] = useState<boolean>(false);
    const handleClick = () => {
        setVisible(true)
    };
    const reset = () => {
        setVisible(false)
    };
    return (
        <>
            <Button className="ql-ai" label="AI" text aria-label="AI" onClick={handleClick}/>
            <AiPrompt visible={visible} reset ={reset} getData={getData} />
        </>
    );
  };

export const RenderHeader = ({ getData }: any) => {
    return (
        <div className="h-5rem p-2">
            <div className="ql-formats h-5rem px-2">
                <Button className="ql-bold" aria-label="Bold"></Button>
                <Button className="ql-italic" aria-label="Italic"></Button>
                <Button className="ql-underline" aria-label="Underline"></Button>
                <Button className="ql-strike" aria-label="Underline"></Button>
                <Button className="ql-header" value="1"></Button>
                <Button className="ql-header" value="2"></Button>
                <select className="ql-size">
                    <option value="small"></option>
                    <option selected ></option>
                    <option value="large"></option>
                    <option value="huge"></option>
                </select>
                <select className='ql-font' aria-label="Font">
                    <option selected ></option>
                    <option  value= 'serif' aria-label="Serif" />
                    <option  value= 'monospace'  aria-label="monospace"/>
                </select>
                <select className='ql-align' aria-label="Align">
                    <option  value= 'center' aria-label="center" />
                    <option  value= 'right'  aria-label="right"/>
                    <option  selected value= 'justify'  aria-label="justify"/>
                </select>
                <Button className="ql-list" value="ordered" aria-label="Ordered List"></Button>
                <Button className="ql-list" value="bullet" aria-label="Unordered List"></Button>
                <Button className="ql-list" value="check" aria-label="Check List"></Button>
                <Button className="ql-script" value="sub"></Button>
                <Button className="ql-script" value="super"></Button>
                <Button className="ql-indent" value="-1"></Button>
                <Button className="ql-indent" value="+1"></Button>
                <Button className="ql-link" aria-label="Link"></Button>
                <Button className="ql-image" aria-label="Image"></Button>
                <Button className="ql-video" aria-label="Video"></Button>
                <Button className="ql-table" aria-label="table"></Button>
                <AiButton getData={ getData }/>
            </div>
        </div>
    );
};

export const ByodEditor =({ onTextChange }: any )=> {
    const [text, setText] = useState<string>('');
    const editorRef = useRef(null);
    const [htmlValue, setHtmlValue] = useState<string>('');
    const getData = ({ value, interpret }: any) => {
        setHtmlValue(text + `<div className="flex" ><img className="h-full w-full flex" width=${value?.width || 200 } height=${ value?.height || 150} alt="Data" src="${value?.img??''}"/></div>` + `<div style="padding:2px;" >${interpret}</div>`);
    }
    const onEditorTextChange=(e: EditorTextChangeEvent)=>{
        onTextChange(e);
        setText(e.htmlValue as any)
    }
    useEffect(()=>{
        setText(htmlValue)
    },[htmlValue])
  

    return (
        <div className="flex w-full flex-column mb-1 gap-2 field">
            <label htmlFor="narrative">Narrative</label> 
            <div className="flex flex-row w-full">
                <AiPromptChartArea  getData={getData} />
                <Editor 
                    ref = { editorRef }
                    value={text} 
                    onTextChange={ onEditorTextChange } 
                    headerTemplate={<RenderHeader getData={getData}/>}
                    modules={{
                        resize: {
                            modules: [ 'Resize', 'DisplaySize', 'Toolbar', 'Keyboard' ]
                        }
                    }}
                    style={{ borderRadius: '4px'}} 
                    className="card flex flex-column w-50rem h-full md:max-h-[658px] lg:max-h-[728px] px-4 py-2 mb-8"
                />
                
            </div>
        </div>
    )
}
        
