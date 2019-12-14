import Image from "@editorjs/image";

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
                // your own uploading logic here
            },
            uploadByUrl(url) {
                return {
                    success: 1,
                    file: {
                        url: url
                    }
                }
            },
        },
    }
}