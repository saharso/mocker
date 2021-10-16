function getHead(method = 'POST', data){
    const head = {
        method: method,
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    }
    if(method === 'POST') {
        head.body = JSON.stringify(data)
    }
    return head;
}
async function postData(url = '/api', data = {}) {
    const response = await fetch(url, getHead('POST', data));

    return response.json();
}

async function getData(url = '/api', data = {}) {
    const response = await fetch(url, getHead('GET', data));

    return response.json();
}

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});

require(["vs/editor/editor.main"], () => {

    window.editor = monaco.editor.create(document.getElementById('container'), {
        value: `{}`,
        language: 'json',
        theme: 'vs-light',
    });

});

window.save.addEventListener('click', async ()=>{
    const value = window.editor.getValue();
    const data = {
        value,
        fileName: window.filename.value,
    }

    const d = await postData('/api/addSchema', data);

    !d.error ? addToSchemasList(d) : console.error(d.error);
});

window.clearEditor.addEventListener('click', ()=>{
    editor.getModel().setValue('{}');
})

function getSchemaFiles(){
    getData('/api/getSchemaFiles').then((data)=>{
        fileListToHTML(data)
    })
}
function fileTemplate(fileId, fileName){
    return `<div id="wrapper_${fileId}" class="file-item">
                 <input id="checkbox_${fileId}" type="checkbox" />
                 <button id="getFile_${fileId}" onclick="getFileContent('${fileName}')">${fileName}</button>
            </div>`
}
function updateFileItem(file){
    const listHTML = window.fileList;
    const li = document.createElement('li');
    li.innerHTML = fileTemplate(file.id, file.name);
    listHTML.appendChild(li);
}
function fileListToHTML(fileList){
    fileList.forEach(updateFileItem)
}
function getFileContent(fileName) {
    getData('/api/getSchemaFile/' + fileName).then((data)=>{
        editor.getModel().setValue(data);
    })
}

function addToSchemasList(data){
    console.log(data);
}
getSchemaFiles();
