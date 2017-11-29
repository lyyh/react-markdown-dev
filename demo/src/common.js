/**
 * 上传文件
 * @param {*} blobFile 
 */
const uploadFileURL = 'http://127.0.0.1:8000/uploadFile'
exports.uploadFile = (fileObj) => {
    var fileData = new FormData()
    fileData.append('file',fileObj)
    
    $.ajax({
        type: "post",
        url: uploadFileURL,
        data: fileData,
        dataType: "json",
        success: function (response) {
            console.log(response.data)
        }
    });
}
