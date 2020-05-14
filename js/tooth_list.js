var appController = new ApplicationController();
var patientController = new PatientController();
var periogramController = new PeriogramController();
var ismController = new ISMController();
var ipbController = new IPBController();
var patient = null;
var toothList = new Array(18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,
                          38,37,36,35,34,33,32,31,41,42,43,44,45,46,47,48);

var PAGE_RECORD = 'record.html';
var ID_LIST_TOOTH = 'tooth_list';

function get(id){
    return document.getElementById(id);
}

function initToothList() {

    let listTooth = get(ID_LIST_TOOTH);
    let htmlItens = '';

    for(let i=0; i<toothList.length; i++){

        htmlItens += 
        '<li class="table-view-cell">' +
        ' Dente ' + toothList[i] +
        ' <div id="' + toothList[i] + '" class="toggle">' +
        '     <div class="toggle-handle"></div>' +
        ' </div>' + 
        '</li>';
    }    
    
    listTooth.innerHTML = htmlItens;
    activateTooths();
}

function activateTooths(){

    let id = appController.getID();
    let patient = patientController.listById(id);
    let toggleList = document.querySelectorAll('div.toggle'); 
    
    for(let i=0, j=0; i<toggleList.length; i++){

        let toothId = JSON.parse(toggleList[i].id);
        
        if(toothId === patient.listaDeDentes[j]){
            toggleList[i].className = 'toggle active';
            j++;
        }
    }
}

function updateToothList(){

    let id = appController.getID();
    let patient = patientController.listById(id);
    let toggleList = document.querySelectorAll('div.toggle.active'); 
    let list = new Array();

    for( var i = 0; i < toggleList.length; i++){ 
        list.push(JSON.parse( toggleList[i].id ));
    }

    patient.listaDeDentes = list;
    patientController.update(patient);
    updatePeriogram(patient);
    updateISM(patient);
    updateIPB(patient);

    window.location.href = PAGE_RECORD;
}

function updatePeriogram(patient) {

    if(patient == null){
        return;
    }
    
    let periogram = periogramController.listById(patient.id);   

    if(periogram != null) {
        for(let i=0; i<periogram.dente.length; i++){
            let remove = true;
            for(let j=0; j<patient.listaDeDentes.length; j++){
                if(periogram.dente[i].numero === patient.listaDeDentes[j]){
                    remove = false;
                    break;
                }
            }
            if(remove){
                periogram.dente.splice(i,1);
                i--;
            }
        }
        
        periogramController.update(periogram);
    }
}

function updateISM(patient) {

    if(patient == null){
        return;
    }
    
    let ism = ismController.listById(patient.id);   
    let list = [];

    if(ism != null) {
        for(let i=0, j=0; i<ism.dente.length; i++){
            
            if(ism.dente[i].numero == patient.listaDeDentes[j]){
                list.push(ism.dente[i]);
                j++;
            }
        }
        ism.dente = list;
        ismController.update(ism);
    }
}

function updateIPB(patient) {

    if(patient == null){
        return;
    }
    
    let ipb = ipbController.listById(patient.id);   
    let list = [];

    if(ipb != null) {
        for(let i=0, j=0; i<ipb.dente.length; i++){
            
            if(ipb.dente[i].numero == patient.listaDeDentes[j]){
                list.push(ipb.dente[i]);
                j++;
            }
        }
        ipb.dente = list;
        ipbController.update(ipb);
    }
}