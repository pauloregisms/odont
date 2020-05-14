function ApplicationController(){
    this.OP_ADD = 'ADD';
    this.OP_UPD = 'UPD';

    this.applicationDAO = new ApplicationDAO();

    this.setID = function (id){
        return this.applicationDAO.setID(id);
    }

    this.getID = function (){
        return this.applicationDAO.getID();
    }

    this.setOperation = function (op){
        return this.applicationDAO.setOperation(op);
    }

    this.getOperation = function (){
        return this.applicationDAO.getOperation();
    }

    return this;
}

function PatientController(){
    this.patientDAO = new GenericDAO('paciente');
    this.appController = new ApplicationController();
    
    this.generateID = function(){
        let today = new Date();
        let s = String(today.getSeconds()).padStart(2, '0');
        let m = String(today.getMinutes()).padStart(2, '0');
        let h = String(today.getHours()).padStart(2, '0');
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = String(today.getFullYear());
        let id = yyyy+mm+dd+h+m+s;

        return JSON.parse(id);
    }

    this.getDate = function(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let date = yyyy + '-' + mm + '-' + dd;
        return date;
    }

    this.create = function (patient){
        if(patient == null) return false;
        
        patient.id = this.generateID();
        this.appController.setID(patient.id);
        this.appController.setOperation(appController.OP_ADD);

        return this.patientDAO.create(patient);
    }

    this.list = function (){
        return this.patientDAO.list();
    }

    this.listById = function (id){
        return this.patientDAO.listById(id);
    }

    this.update = function (patient){
        if(patient == null) 
            return false;

        this.appController.setID(patient.id);
        this.appController.setOperation(appController.OP_UPD);

        return this.patientDAO.update(patient);
    }

    this.delete = function (id){
        return this.patientDAO.delete(id);
    }
}

function PSRController(){
    this.psrDAO = new GenericDAO('psr');
    this.appController = new ApplicationController();

    this.create = function (psr){
        if(psr == null) return false;
                
        return this.psrDAO.create(psr);
    }

    this.list = function (){
        return this.psrDAO.list();
    }

    this.listById = function (patientId){
        return this.psrDAO.listById(patientId);
    }

    this.update = function (psr){
        if(psr == null) 
            return false;

        return this.psrDAO.update(psr);
    }

    this.delete = function (patientId){
        return this.psrDAO.delete(patientId);
    }
}

function ISMController(){
    this.ismDAO = new GenericDAO('ism');
    this.appController = new ApplicationController();

    this.create = function (ism){
        if(ism == null) 
            return false;
                
        return this.ismDAO.create(ism);
    }

    this.list = function (){
        return this.ismDAO.list();
    }

    this.listById = function (patientId){
        return this.ismDAO.listById(patientId);
    }

    this.update = function (ism){
        if(ism == null) 
            return false;

        return this.ismDAO.update(ism);
    }

    this.delete = function (patientId){
        return this.ismDAO.delete(patientId);
    }
}

function IPBController(){
    this.ipbDAO = new GenericDAO('ipb');
    this.appController = new ApplicationController();

    this.create = function (ipb){
        if(ipb == null) 
            return false;
                
        return this.ipbDAO.create(ipb);
    }

    this.list = function (){
        return this.ipbDAO.list();
    }

    this.listById = function (patientId){
        return this.ipbDAO.listById(patientId);
    }

    this.update = function (ipb){
        if(ipb == null) 
            return false;

        return this.ipbDAO.update(ipb);
    }

    this.delete = function (patientId){
        return this.ipbDAO.delete(patientId);
    }
}

function PeriogramController(){
    this.periogramDAO = new GenericDAO('periograma');
    this.appController = new ApplicationController();

    this.create = function (periogram){
        if(periogram == null) 
            return false;
                
        return this.periogramDAO.create(periogram);
    }

    this.list = function (){
        return this.periogramDAO.list();
    }

    this.listById = function (patientId){
        return this.periogramDAO.listById(patientId);
    }

    this.update = function (periogram){
        if(periogram == null) 
            return false;

        return this.periogramDAO.update(periogram);
    }

    this.delete = function (patientId){
        return this.periogramDAO.delete(patientId);
    }
}