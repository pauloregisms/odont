var appController = new ApplicationController();
var patientController = new PatientController();
var patient = null;

var ID_PATIENT_CONSULT_DATE = 'patient_consult_date';
var ID_PATIENT_ID = 'patient_id';
var ID_PATIENT_NAME = 'patient_name';
var ID_PATIENT_RECORD = 'patient_record';
var ID_PATIENT_CONSULT_DATE = 'patient_consult_date';
var ID_PATIENT_LINKS = 'patient_links';

var PAGE_INDEX = 'index.html';
var PAGE_PSR = 'psr.html';
var PAGE_PERIOGRAM = 'periogram.html';
var PAGE_TOOTH_LIST = 'tooth_list.html';

var CONSULT_TYPE_EVALUATION = 1;
var CONSULT_TYPE_REVALUATION = 2;
var CONSULT_TYPE_MANTENANCE = 3;
var TOOTHS_LIST = new Array(18,17,16,15,14,13,12,11, 21,22,23,24,25,26,27,28,
                             38,37,36,35,34,33,32,31, 41,42,43,44,45,46,47,48);

function get(id){
    return document.getElementById(id);
}

function getConsultType(){
    let listControlItens = document.querySelectorAll('.control-item');
    let consultType = 0;
    
    for(let i=0; i<listControlItens.length; i++){
        if(listControlItens[i].className == 'control-item active'){
            consultType = i+1;
            return consultType;
        }
    }
    
    return consultType;
}

function setConsultType(type){
    let listControlItens = document.querySelectorAll('.control-item');

    for(let i=0; i<listControlItens.length; i++){
        if(type-1 == i){
            listControlItens[i].className = 'control-item active';                        
        }
        else{
            listControlItens[i].className = 'control-item';
        }
    }
}

function initRecord(){
    let id = appController.getID();
    
    if(id == 0)
        patient = new Patient();
    else
        patient = patientController.listById(id);

    if(appController.getOperation() === appController.OP_UPD){
        get(ID_PATIENT_ID).value = patient.id;
        get(ID_PATIENT_NAME).value = patient.nome;
        get(ID_PATIENT_RECORD).value = patient.prontuario;
        get(ID_PATIENT_CONSULT_DATE).value = patient.dataDaConsulta;
        setConsultType(patient.tipoDeConsulta);
        
        get(ID_PATIENT_NAME).focus();
        createTableLinks();
    }
    else{
        get(ID_PATIENT_CONSULT_DATE).value = patientController.getDate();
        setConsultType(CONSULT_TYPE_EVALUATION);
    }
}

function preparePatient(){
    if(get(ID_PATIENT_NAME).value == "")
        return 1;

    patient.nome = get(ID_PATIENT_NAME).value;
    patient.prontuario = Number.parseInt(get(ID_PATIENT_RECORD).value);
    patient.dataDaConsulta = get(ID_PATIENT_CONSULT_DATE).value;
    patient.tipoDeConsulta = getConsultType();

    return 0;
}

function createTableLinks(){
    if(appController.getOperation() === appController.OP_UPD){
        let tableLinks = get(ID_PATIENT_LINKS);
        let htmlItens = `
        <ul class="table-view">
            <li class="table-view-cell">
                <a id="psr" class="push-right" href="psr.html" data-ignore="push">
                    <strong>PSR</strong>
                </a>
            </li>
            <li class="table-view-cell">
                <a class="push-right" href="tooth_list.html" data-ignore="push">
                    <strong>Ausência de dentes</strong>
                </a>
            </li>
            <li class="table-view-cell">
                <a class="push-right" href="ism.html" data-ignore="push">
                    <strong>ISM</strong>
                </a>
            </li>
            <li class="table-view-cell">
                <a class="push-right" href="ipb.html" data-ignore="push">
                    <strong>IPB</strong>
                </a>
            </li>
            <li class="table-view-cell">
                <a class="push-right" href="periogram.html" data-ignore="push">
                    <strong>Periograma</strong>
                </a>
            </li>
        </ul>
        `;
        tableLinks.innerHTML = htmlItens;
    }
}

function save(){
    if(preparePatient()){
        get('patient_nome').style = "background-color: #ffabab;";
    }
    else{
        let pat = patientController.listById(patient.id);
        if(pat == null){
            patientController.create(patient);
        }
        else{
            patientController.update(patient);
        }
        
        window.location.href = PAGE_INDEX;
    }
}

function deletePatient(){
    let id = appController.getID();
    
    patientController.delete(id);
    window.location.href = PAGE_INDEX;
}