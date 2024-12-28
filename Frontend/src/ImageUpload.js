import React, { useEffect, useState } from "react";
import { imageDb } from './FireBaseConfig';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

/* const uploadImage = (img) => {
    return new Promise((resolve, reject) => {
        if (img !== null) {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img)
                .then(snapshot => {
                    return getDownloadURL(snapshot.ref);
                })
                .then(url => {
                    //setImgUrl(url); // Update the state with the URL
                    resolve(url);    // Return the URL to the caller
                })
                .catch(error => {
                    reject(error);
                });
        } else {
            reject(new Error("No image selected"));
        }
    });
};

function FirebaseImageUpload(){
    const [img,setImg] =useState('')
    const [imgUrl,setImgUrl] =useState([])

    const handleClick = () =>{
     if(img !==null){
        const imgRef =  ref(imageDb,`files/${v4()}`)
        uploadBytes(imgRef,img).then(value=>{
            console.log(value)
            getDownloadURL(value.ref).then(url=>{
                setImgUrl(data=>[...data,url])
            })
        })
     }
    }

  
    
    useEffect(()=>{
        listAll(ref(imageDb,"files")).then(imgs=>{
            console.log(imgs)
            imgs.items.forEach(val=>{
                getDownloadURL(val).then(url=>{
                    setImgUrl(data=>[...data,url])
                    console.log(url)
                })
            })
        })
    },[])
 
    return(
        <div className="App">
                <input type="file" onChange={(e)=>setImg(e.target.files[0])} /> 
                <button onClick={handleClick}>Upload</button>
                <br/>
                {
                    imgUrl.map(dataVal=><div>
                        <img src={dataVal} height="200px" width="200px" />
                        <br/> 
                    </div>)
                }
        </div>
    )
}
export default FirebaseImageUpload; */

export function useFirebaseUpload() {
    const uploadImage = (img) => {
        return new Promise((resolve, reject) => {
            if (img !== null) {
                const imgRef = ref(imageDb, `files/${v4()}`);
                uploadBytes(imgRef, img)
                    .then(snapshot => {
                        return getDownloadURL(snapshot.ref);
                    })
                    .then(url => {
                        resolve(url);    // Return the URL to the caller
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                reject(new Error("No image selected"));
            }
        });
    };

    return { uploadImage };
}