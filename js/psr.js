var appController = new ApplicationController();
var patientController = new PatientController();
var psrController = new PSRController();
var psr = null;
const PAGE_RECORD = 'record.html';

function get(id){
    return document.getElementById(id);
}

function initPSR(){

    let id = appController.getID();
    let patient = patientController.listById(id);
    psr = psrController.listById(id);

    if(psr == null){
        psr = new PSR(patient);
    }
    else{
        
        let divs = document.querySelectorAll('.segmented-control');
        
        for(let i=0; i<divs.length; i++){
            
            for(let j=0; j<divs[i].children.length; j++){
                
                if(j == psr.sextante[i].codigo){
                    divs[i].children[j].classList = 'control-item active';
                }
                else{
                    divs[i].children[j].classList = 'control-item';
                }
            }

            if(psr.sextante[i].asterisco){
                get(`star_${i+1}`).classList.toggle('btn-negative');
            }
        }
        get('note').value = psr.nota;
    }
}

function save(){

    psr.nota = get('note').value;

    let list = psrController.list();

    if(list.length == 0){
        psrController.create(psr);
    }
    else{
        psrController.update(psr);
    }
    
    window.location.href = PAGE_RECORD;
}

function setCode(sextant, code) {
        
    psr.sextante[sextant-1].codigo = code;
    psrController.update(psr);
}

function clickButton(sextantNumber) {
    
    get(`star_${sextantNumber}`).classList.toggle('btn-negative');
    psr.sextante[sextantNumber-1].asterisco = !psr.sextante[sextantNumber-1].asterisco;

    if(psr.sextante[sextantNumber-1].asterisco){
        note(psr.sextante[sextantNumber-1]);
        psr.nota = get('note').value;
    }
    
    psrController.update(psr);
}

function note(sextantObject){

    let noteEl = get('note');

    if(noteEl.value == ''){
        noteEl.value = `${sextantObject.rotulo} ${sextantObject.codigo}*: `;
    }
    else{
        noteEl.value += `\n${sextantObject.rotulo} ${sextantObject.codigo}*: `;
    }
}