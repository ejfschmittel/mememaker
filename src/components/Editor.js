import React from "react"

const Editor = ({children, className}) => (
    <div className={`editor ${className}`}>
        {children}
    </div>
)

export const EditorRow = ({children, className}) => (
    <div className={`editor__row ${className}`}>
        {children}
    </div>
)

export const EditorField = ({children, className}) => (
    <div className={`editor__field ${className}`}>
        {children}
    </div>
)

export const EditorInput = ({className, ...props}) => (
    <input className={`editor__field ${className}`} {...props}/>
)

export default Editor