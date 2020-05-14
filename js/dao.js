function writeFile(dataObject, fileName){
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady(){
        if(cordova.file == undefined){
            console.log('ERRO: cordova.file == undefined');
        }
        else{
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
                fileSystemReady, fileSystemError);
        }
    }

    function fileSystemReady(fs){
        let fileDir = cordova.file.externalDataDirectory.replace(cordova.file.externalRootDirectory, '');
        let filePath = fileDir + fileName;

        fs.root.getFile(filePath, {create: true, exclusive : false}, 
            fileEntryReady, fileEntryError);
    }

    function fileSystemError(){
        console.log('ERROR: this.setDB: window.resolveLocalFileSystemURL.');
    }

    function fileEntryReady(fileEntry){
        fileEntry.createWriter(createFileWriter);
    }

    function fileEntryError(){
        console.log('ERROR: dir.getFile.');
    }

    function createFileWriter(fileWriter){
        fileWriter.onwriteend = function (){
            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e){
            console.log("ERRO: failed file write: " + e.toString());
        };

        fileWriter.write(dataObject);
    }
}

function ApplicationDAO() {
    this.id = 0;
    this.operation = '';

    this.setID = function (id){
        if(id == null) return false;
        localStorage.setItem('id', JSON.stringify(id));
        return true;
    }

    this.getID = function (){
        return JSON.parse( localStorage.getItem('id') );
    }

    this.setOperation = function (op){
        if(op == null) return false;
        localStorage.setItem('operation', JSON.stringify(op));
        return true;
    }

    this.getOperation = function (){
        return JSON.parse( localStorage.getItem('operation') );
    }

    return this;
}

function GenericDAO(identificationKey){
    this.localStorageKey = identificationKey;
    this.fileName = identificationKey + '.txt';

    this.list = function (){
        let list = JSON.parse(localStorage.getItem(this.localStorageKey));
        
        if(list == null){
            return [];
        }
        return list;
    }

    this.create = function (dataObject){
        if(dataObject == null)
            return false;

        let list = this.list();
        list.push(dataObject);
        localStorage.setItem(this.localStorageKey, JSON.stringify(list));
        writeFile(list, this.fileName);

        return true;
    }

    this.update = function (dataObject){
        if(dataObject == null)
            return false;

        let list = this.list();
        
        if(list.length == 0){
            return false;
        }
        else{
            for(let i=0; i<list.length; i++){
                if(dataObject.id == list[i].id){
                    list[i] = dataObject;

                    localStorage.setItem(this.localStorageKey, JSON.stringify(list));
                    writeFile(list, this.fileName);
                    return true;
                }
            }
        }

        return false;
    }

    this.listById = function (id){        
        let list = this.list();

        for(let i=0; i<list.length; i++){
            if(id === list[i].id)
                return list[i];
        }

        return null;
    }

    this.delete = function (id){
        let list = this.list();

        for(let i=0; i<list.length; i++){
            if(id === list[i].id){
                list.splice(i,1);

                localStorage.setItem(this.localStorageKey, JSON.stringify(list));
                writeFile(list, this.fileName);
                return true;
            }
        }
        
        return false;
    }

    return this;
}