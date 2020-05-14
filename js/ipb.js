var appController = new ApplicationController();
var patientController = new PatientController();
var ipbController = new IPBController();
var ipb = null;
var TOOTH_LIST = 'tooth_list';
var PAGE_RECORD =  'record.html';

function get(id){
    return document.getElementById(id);
}

function initIPB(){
    
    let id = appController.getID();
    let patient = patientController.listById(id);
    ipb = ipbController.listById(id);

    if(ipb == null){
        ipb = new IPB(patient);
    }
    else{
        ipb = updateIPB(ipb, patient);
        ipbController.update(ipb);
    }

    createListItens(ipb);
}

function updateIPB(ipb, patient) {

    let dente = [];

    for(let i=0, j=0; i < ipb.dente.length; i++){
        
        if(ipb.dente[i].numero == patient.listaDeDentes[j]){
            dente.push(ipb.dente[i]);
            j++;
        }
    }
    
    ipb.dente = dente;

    return ipb;
}

function clickButton(element){
    element.classList.toggle('btn-negative');
}

function createListItens(ipb){
    
    let list = get(TOOTH_LIST);
    let htmlItens = '';
    
    for(let i=0; i<ipb.dente.length; i++){

        htmlItens += `
        <li class="table-view-cell">
            Dente ${ipb.dente[i].numero}
            <div class="tetracolumn" style="margin-top: 0px;">
                <button ${ipb.dente[i].distal ? 'class="btn btn-negative"' : 'class="btn"'} onclick="clickButton(this)">D</button>
                <button ${ipb.dente[i].vestibular ? 'class="btn btn-negative"' : 'class="btn"'} onclick="clickButton(this)">V</button>
                <button ${ipb.dente[i].mesial ? 'class="btn btn-negative"' : 'class="btn"'} onclick="clickButton(this)">M</button>
                <button ${ipb.dente[i].lingual ? 'class="btn btn-negative"' : 'class="btn"'} onclick="clickButton(this)">L</button>
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
        
        ipb.dente[i].distal = listChild[0].classList != 'btn';
        ipb.dente[i].vestibular = listChild[1].classList != 'btn';
        ipb.dente[i].mesial = listChild[2].classList != 'btn';
        ipb.dente[i].lingual = listChild[3].classList != 'btn';
    }

    list = ipbController.list();

    if(list.length == 0){
        ipbController.create(ipb);
    }
    else{
        ipbController.update(ipb);
    }
    
    window.location.href = PAGE_RECORD;
}
