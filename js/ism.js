var appController = new ApplicationController();
var patientController = new PatientController();
var ismController = new ISMController();
var ism = null;
var TOOTH_LIST = 'tooth_list';
var PAGE_RECORD =  'record.html';

function get(id){
    return document.getElementById(id);
}

function initISM(){
    
    let id = appController.getID();
    let patient = patientController.listById(id);
    ism = ismController.listById(id);

    if(ism == null){
        ism = new ISM(patient);
    }
    else{
        ism = updateISM(ism, patient);
        ismController.update(ism);
    }

    createListItens(ism);
}

function updateISM(ism, patient) {

    let dente = [];

    for(let i=0, j=0; i < ism.dente.length; i++){
        
        if(ism.dente[i].numero == patient.listaDeDentes[j]){
            dente.push(ism.dente[i]);
            j++;
        }
    }
    
    ism.dente = dente;

    return ism;
}

function clickButton(element){
    element.classList.toggle('btn-negative');
}

function createListItens(ism){
    
    let list = get(TOOTH_LIST);
    let htmlItens = '';
    
    for(let i=0; i<ism.dente.length; i++){

        htmlItens += `
        <li class="table-view-cell">
            Dente ${ism.dente[i].numero}
            <div class="tetracolumn" style="margin-top: 0px;">
                <button ${ism.dente[i].distal ? 'class="btn btn-negative"' : 'class="btn"'} onclick="clickButton(this)">D</button>
                <button ${ism.dente[i].vestibular ? 'class="btn btn-negative"' : 'class="btn"'} onclick="clickButton(this)">V</button>
                <button ${ism.dente[i].mesial ? 'class="btn btn-negative"' : 'class="btn"'} onclick="clickButton(this)">M</button>
                <button ${ism.dente[i].lingual ? 'class="btn btn-negative"' : 'class="btn"'} onclick="clickButton(this)">L</button>
            </div>
        </li>
        `;
    }
    
    list.innerHTML = htmlItens;
}

function save(){
    
    let list = document.querySelectorAll('.tetracolumn');
    
    for(let i=0; i<list.length; i++){

        let listChild = list[i].children;
        
        ism.dente[i].distal = listChild[0].classList != 'btn';
        ism.dente[i].vestibular = listChild[1].classList != 'btn';
        ism.dente[i].mesial = listChild[2].classList != 'btn';
        ism.dente[i].lingual = listChild[3].classList != 'btn';
    }

    list = ismController.list();

    if(list.length == 0){
        ismController.create(ism);
    }
    else{
        ismController.update(ism);
    }
    
    window.location.href = PAGE_RECORD;
}
