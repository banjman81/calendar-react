import React, {useState} from 'react'


function UploadPage() {

    const [image, setImage] = useState(null)
    const [picture, setPicture] = useState(null)

    const uploadFile = async (image) => {   
        const file = image.selectedFile
        const {url} = await fetch('http://localhost:3001/api/event/s3url').then(res => res.json())

        await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type" : 'multipart/form-data'
            },
            body: file
        })
        
        const imageUrl = url.split('?')[0]
        setPicture(imageUrl)
        console.log(imageUrl)
    }


    const imageSelectHandler = (e) => {
        // console.log(e.target.files[0])
        setImage({
            selectedFile: e.target.files[0]
        })
    }
return (
        <div>
            <h1>Pics</h1>
            <input type="file" onChange={e => imageSelectHandler(e)}/>
            <button onClick={() => uploadFile(image)}>Submit</button>
                <img src={picture} alt="aw" /> 
        </div>
    )
}

export default UploadPage