import React, { createRef} from 'react'


const FormAds = (props)=>{
    const fileInput = createRef()
    
    return (<form
        onSubmit={(e)=>{
            e.preventDefault()
            props.handleSubmit()
        }}
    >
        <input type="text"
            name="title"
            value={props.Title}
            onChange={(e)=>{
                props.onChangeTitle(e.currentTarget.value)
            }}
            placeholder="titre"
        />
        <textarea
            name="contents"
            value={props.Contents}
            onChange={(e)=>{
                props.onChangeContents(e.currentTarget.value)
            }}
        >
        
        </textarea>
        <input type="file"
            ref={fileInput}
            onChange={(e)=>{
                console.log(e.currentTarget.files[0])
                props.onChangeFile(fileInput.current.files[0])
            }}
        />
        <button>Envoyer</button>
    </form>)
}

export default FormAds