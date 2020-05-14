function Patient(){
     
    this.id = 0;
    this.nome = '';
    this.prontuario = 0;
    this.dataDaConsulta = new Date();
    this.tipoDeConsulta = 0;
    this.listaDeDentes = new Array(18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,
                                38,37,36,35,34,33,32,31,41,42,43,44,45,46,47,48);
    this.psr = null;
    this.periograma = null;
    this.ism = null;
    this.ipb = null;

    this.setConsultType = function(type){
        this.tipoDeConsulta = type;
    }
}

function PSR(patient){

    if(patient == null) return null;
    
    this.id = patient.id;
    this.sextante =
        [
            {rotulo : 'I',   codigo : 0, asterisco : false},
            {rotulo : 'II',  codigo : 0, asterisco : false},
            {rotulo : 'III', codigo : 0, asterisco : false},
            {rotulo : 'IV',  codigo : 0, asterisco : false},
            {rotulo : 'V',   codigo : 0, asterisco : false},
            {rotulo : 'VI',  codigo : 0, asterisco : false} 
        ];
    this.nota = '';

    return this;
}

function ISM(patient) {

    if(patient == null) return null;

    this.id = patient.id;
    this.dente = [];

    for(let i=0; i<patient.listaDeDentes.length; i++){
        this.dente.push({
            numero : patient.listaDeDentes[i],
            distal : false, 
            vestibular : false,
            mesial : false, 
            lingual : false
        });
    }

    return this;
}

function IPB(patient) {

    if(patient == null) return null;

    this.id = patient.id;
    this.dente = [];

    for(let i=0; i<patient.listaDeDentes.length; i++){
        this.dente.push({
            numero : patient.listaDeDentes[i],
            distal : false, 
            vestibular : false,
            mesial : false, 
            lingual : false
        });
    }

    return this;
}

function Tooth(id){

    this.numero = id;
    this.sitio = [
        {rotulo:'D', sangramento:false, ps:0, ng:0, ni:0, furca:0},
        {rotulo:'V', sangramento:false, ps:0, ng:0, ni:0, furca:0},
        {rotulo:'M', sangramento:false, ps:0, ng:0, ni:0, furca:0}
    ];
    
    this.mobilidade = 0;

    return this;
}

function Periogram(patient){
    
    if(patient == null) return null;

    this.id = patient.id;
    this.dente = [];

    let topFrontTooth = new Array(18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28);
    let topBackTooth = new Array(28,27,26,25,24,23,22,21,11,12,13,14,15,16,17,18);
    let bottomFrontTooth = new Array(38,37,36,35,34,33,32,31,41,42,43,44,45,46,47,48);
    let bottomBackTooth = new Array(48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38);
    let tooth = null;

    for(let i=0; i<topFrontTooth.length; i++){
        if(patient.listaDeDentes.includes(topFrontTooth[i])){
            this.dente.push(new Tooth(topFrontTooth[i]));
        }
    }

    for(let i=0; i<topBackTooth.length; i++){
        if(patient.listaDeDentes.includes(topBackTooth[i])){
            tooth = new Tooth(topBackTooth[i]);
            tooth.sitio[1].rotulo = 'L';
            this.dente.push(tooth);
        }
    }

    for(let i=0; i<bottomFrontTooth.length; i++){
        if(patient.listaDeDentes.includes(bottomFrontTooth[i])){
            this.dente.push(new Tooth(bottomFrontTooth[i]));
        }
    }
    
    for(let i=0; i<bottomBackTooth.length; i++){
        if(patient.listaDeDentes.includes(bottomBackTooth[i])){
            tooth = new Tooth(bottomBackTooth[i]);
            tooth.sitio[1].rotulo = 'L';
            this.dente.push(tooth);
        }
    }       

    return this;
}