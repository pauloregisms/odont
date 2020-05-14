var appController = new ApplicationController();
var patientController = new PatientController();

var ID_TABLE_PATIENT = 'table_patient';
var PAGE_RECORD = 'record.html'
var OPERATION = appController.OP_ADD;

function get(id){
    return document.getElementById(id);
}

function initApplication() {
    appController.setOperation(appController.OP_ADD);
    let list = patientController.list();
    createTablePatient(list);
}

function selectPatient(idPatient){
    if(appController.setID(idPatient) && appController.setOperation(appController.OP_UPD))
        window.location.href = PAGE_RECORD;
}

function createTablePatient(listPatient){

    let tablePatient = get(ID_TABLE_PATIENT);
    
    let htmlItens = '';
    for(let i=0; i < listPatient.length; i++){
        htmlItens +=
            '<li class="table-view-cell">'+
            '    <a class="push-right" data-ignore="push" href="'+ PAGE_RECORD +'"'+
            '    onclick="selectPatient('+listPatient[i].id+')">' +
            '         <strong>'+ listPatient[i].nome +'</strong>' +
            '    </a>' +
            '</li>';
    }
    
    tablePatient.innerHTML = htmlItens;
}

function addPatient() {
    appController.setID(0);
}

