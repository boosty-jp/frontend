import Image from "@editorjs/image";
import getFirebase from "utils/firebase";
import uuidv4 from 'uuid/v4'

export const image =
{
    class: Image,
    inlineToolbar: true,
    toolbox: {
        title: '画像'
    },
    config: {
        buttonContent: '画像を選択してください',
        captionPlaceholder: '画像の説明',
        uploader: {
            /**
             * Upload file to the server and return an uploaded image data
             * @param {File} file - file selected from the device or pasted by drag-n-drop
             * @return {Promise.<{success, file: {url}}>}
             */
            uploadByFile(file) {
                return uploadImage(file).then(imageUrl => {
                    return {
                        success: 1,
                        file: {
                            url: imageUrl
                        }
                    }
                }).catch(() => {
                    return {
                        success: 0
                    }
                })
            },
            uploadByUrl(url) {
                return new Promise((resolve, reject) => {
                    resolve({
                        success: 1,
                        file: {
                            url: url
                        }
                    });
                })
            },
        },
    }
}

const uploadImage = async file => {
    const firebase = getFirebase();

    const metadata = {
        contentType: file.type
    }

    const storageRef = await firebase.storage().ref()

    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                reject();
            } else {
                const fileName = 'page-content-' + uuidv4();
                const imgFile = storageRef.child(`user/${user.uid}/${fileName}.png`)

                try {
                    const image = await imgFile.put(file, metadata);
                    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/" + image.metadata.bucket + "/o/" + encodeURIComponent(image.metadata.fullPath) + "?alt=media";
                    resolve(imageUrl);
                } catch (e) {
                    reject();
                }
            }
        })
    });
}