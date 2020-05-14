var appController = new ApplicationController();
var periogramController = new PeriogramController();
var patientController = new PatientController();
var periogram = null;

var TOOTH_INDEX = 0;
var PAGE_RECORD = 'record.html';

function get(id){
    return document.getElementById(id);
}

function initPeriogram(){
    let id = appController.getID();
    let patient = patientController.listById(id);
    periogram = periogramController.listById(id);

    if(periogram == null){
        periogram = new Periogram(patient);
    }

    let tooth = periogram.dente[TOOTH_INDEX];

    get('title').innerHTML = tooth.numero;
    get('site_2').innerHTML = tooth.sitio[1].rotulo;

    get('sang_1').className = tooth.sitio[0].sangramento ? 'toggle active' : 'toggle';
    get('sang_2').className = tooth.sitio[1].sangramento ? 'toggle active' : 'toggle';
    get('sang_3').className = tooth.sitio[2].sangramento ? 'toggle active' : 'toggle';
    
    get('ps_1').innerHTML = tooth.sitio[0].ps;
    get('ps_2').innerHTML = tooth.sitio[1].ps;
    get('ps_3').innerHTML = tooth.sitio[2].ps;
    
    get('ng_1').innerHTML = tooth.sitio[0].ng;
    get('ng_2').innerHTML = tooth.sitio[1].ng;
    get('ng_3').innerHTML = tooth.sitio[2].ng;
    
    get('ni_1').innerHTML = tooth.sitio[0].ni;
    get('ni_2').innerHTML = tooth.sitio[1].ni;
    get('ni_3').innerHTML = tooth.sitio[2].ni;

    get('furc_1').innerHTML = tooth.sitio[0].furca;
    get('furc_2').innerHTML = tooth.sitio[1].furca;
    get('furc_3').innerHTML = tooth.sitio[2].furca;

    get('mobility').innerHTML = tooth.mobilidade;

    active(1,1);

    for(let i=0; i<patient.listaDeDentes.length; i++)
        get('btnlink_'+patient.listaDeDentes[i]).disabled = false;
}

function save(){
    let tooth = periogram.dente[TOOTH_INDEX];

    tooth.sitio[0].sangramento = (get('sang_1').className === 'toggle active');
    tooth.sitio[1].sangramento = (get('sang_2').className === 'toggle active');
    tooth.sitio[2].sangramento = (get('sang_3').className === 'toggle active');
    
    tooth.sitio[0].ps = Number.parseInt(get('ps_1').innerHTML);
    tooth.sitio[1].ps = Number.parseInt(get('ps_2').innerHTML);
    tooth.sitio[2].ps = Number.parseInt(get('ps_3').innerHTML);

    tooth.sitio[0].ng = Number.parseInt(get('ng_1').innerHTML);
    tooth.sitio[1].ng = Number.parseInt(get('ng_2').innerHTML);
    tooth.sitio[2].ng = Number.parseInt(get('ng_3').innerHTML);
    
    tooth.sitio[0].ni = Number.parseInt(get('ni_1').innerHTML);
    tooth.sitio[1].ni = Number.parseInt(get('ni_2').innerHTML);
    tooth.sitio[2].ni = Number.parseInt(get('ni_3').innerHTML);

    tooth.sitio[0].furca = get('furc_1').innerHTML;
    tooth.sitio[1].furca = get('furc_2').innerHTML;
    tooth.sitio[2].furca = get('furc_3').innerHTML;

    tooth.mobilidade = Number.parseInt(get('mobility').innerHTML);
    periogram.dente[TOOTH_INDEX] = tooth;

    let p = periogramController.listById(periogram.id);
    if(p == null){
        return periogramController.create(periogram);
    }
    else{
        return periogramController.update(periogram);
    }
}

function next(){
    if(save()){
        TOOTH_INDEX++;

        if(TOOTH_INDEX < periogram.dente.length){
            get('next').disabled = false;
            get('next').className = 'tab-item active';
        }
        else{
            TOOTH_INDEX--;
            get('next').disabled = true;
            get('next').className = 'tab-item';
        }
        
        initPeriogram();
    }
}

function prev(){
    if(save()){
        TOOTH_INDEX--;

        if(TOOTH_INDEX < 0){
            TOOTH_INDEX++;
            get('prev').disabled = true;
            get('prev').className = 'tab-item';
        }
        else{
            get('prev').disabled = false;
            get('prev').className = 'tab-item active';
        }

        initPeriogram();
    }
}

function goTo(tooth){
    if(save()){
        let id = appController.getID();
        periogram = periogramController.listById(id);
        
        let modal = document.getElementById('modal');
        let site = 'L';

        if(get('vestibular').className === 'control-item active'){
            site = 'V';
        }

        for(let i=0; i<periogram.dente.length; i++){
            if(periogram.dente[i].numero == tooth &&
                periogram.dente[i].sitio[1].rotulo == site){

                TOOTH_INDEX = i;
                break;
            }
        }

        modal.classList.toggle('active');
        initPeriogram();
    }
}

function active(number, block){
    let badgies = document.querySelectorAll('.badge');
    number--;
    block--;

    for(let i=0; i<badgies.length; i++){
        if(block*3 + number === i)
            badgies[i].className = 'badge badge-positive';
        else
            badgies[i].className = 'badge';
    }
}

function setCurrentBadjgeValue(value) {
    let badgies = document.querySelectorAll('.badge');

    for(let i=0; i<badgies.length; i++){
        if(badgies[i].className === 'badge badge-positive'){
            badgies[i].innerHTML = prepareContent(badgies[i].innerHTML, value);
            break;
        }
    }

    updateNI();
    save();
}

function prepareContent(lastContent, newContent){
    if(Number.isInteger(newContent)){
        if(lastContent == 0)
            return newContent;

        return Number.parseInt(lastContent + '' + newContent);
    }
    else{
        if(newContent === '-' && lastContent !== '0')
            return -1 * lastContent;
        
        if(newContent === '-' && lastContent === '0')
            return '-';

        if(newContent === 'clear')
            return 0; 
    }
}

function activeNextInput() {
    let badgies = document.querySelectorAll('.badge');

    for(let i=0; i<badgies.length; i++){
        if(badgies[i].className === 'badge badge-positive'){
            badgies[i].className = 'badge';     
            if(i+1 < 6)
                badgies[i+1].className = 'badge badge-positive';
            else
                badgies[0].className = 'badge badge-positive';
            break;
        }
    }
}

function updateNI(){
    for(let i=1; i<=3; i++){
        let ps = Number.parseInt(get('ps_' + i).innerHTML);
        let ng = Number.parseInt(get('ng_' + i).innerHTML);
        get('ni_' + i).innerHTML = ps + ng;
    }
}

function furcationLevelToNumber(furcationLevel){
    switch(furcationLevel) {
        case 'I':
            return 1;
        case 'II':
            return 2;
        case 'III':
            return 3;
        default:
            return 0;
    }
}

function numberToFurcationLevel(number){
    switch(number) {
        case 1:
            return 'I';
        case 2:
            return 'II';
        case 3:
            return 'III';
        default:
            return 0;
    }
}

function setFurcLevel(id){
    let value = furcationLevelToNumber(get(id).innerHTML);
    get(id).innerHTML =  numberToFurcationLevel(++value % 4);
    save();
}

function setMobLevel(id){
    let value = Number.parseInt(get(id).innerHTML);
    get(id).innerHTML =  ++value % 4;
    save();
}

function saveAndReturn() {
    save();
    window.location.href = PAGE_RECORD;
}