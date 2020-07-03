import React from 'react';

class Upload extends React.Component {

    state={image:null};

    uploadHandler = async e => {
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const response = await fetch('http://localhost:5000/classify',{
                method:'POST',
                body:formData
            });
            const res = await response.json();
            console.log(res);
        }
        catch(err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div style={{margin:20,padding:20,alignItems:'center'}}>
                <input type="file" id="uploader" onChange={e=>this.uploadHandler(e)}/>
            </div>
        );
    }

}

export default Upload;