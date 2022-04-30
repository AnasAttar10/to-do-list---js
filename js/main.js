
let todolist = document.getElementById('todolist') ; 
let cname=document.getElementById('cname') ;
let ccategory=document.getElementById('ccategory') ;
let cprice=document.getElementById('cprice') ;
let cdescription=document.getElementById('cdescription') ;
let add=document.getElementById('add') ;
let clear=document.getElementById('clear') ;
let tbody=document.getElementById('tbody');
let search =document.getElementById('search');
let Arr_Results ; 
let updatedIndex ;
let counterId ;



/* To chick if founded array of course in local storage or not */
if (! localStorage.getItem('courses')){
     Arr_Results = [] ;
}
else{
    Arr_Results =JSON.parse(localStorage.getItem('courses')) ;
}

displayElements(Arr_Results);


search.addEventListener('keyup',searchElement) ;

function searchElement(){

    let value = search.value.toLowerCase();

    console.log(value);

    let ArrayToSearch =[]; 

    for(let i =0; i<Arr_Results.length ; i++ ){

        let cuurent_value =Arr_Results[i].cname.toLowerCase();

        if(cuurent_value.includes(value)){
            ArrayToSearch.push(Arr_Results[i]);
        }
    }
    displayElements(ArrayToSearch);
    
} 

if(! localStorage.getItem('id')){
    counterId = 1 ;
}
else{
    counterId = localStorage.getItem('id') ;
}

add.addEventListener('click' ,function(e){

    e.preventDefault();

    changesAddBtn(); 

    if(add.getAttribute('state_btn')==='add')
        createElement();
    else 
        updateElement(updatedIndex);

}
);

clear.addEventListener('click',clearfields) ;

function displayElements(Arr_Results){

    let result="" ; 
    for(let i = 0; i< Arr_Results.length ; i++ ){
        result+=`<tr>
                <td>${Arr_Results[i].cid}</td>
                <td>${Arr_Results[i].cname}</td>
                <td>${Arr_Results[i].ccategory}</td>
                <td>${Arr_Results[i].cprice}</td>
                <td>${Arr_Results[i].cdescription}</td>
                <td><i class="fas fa-edit" onclick="displayUpdatedElementInForm(${i})"></i></td>
                <td><i class="fas fa-trash-alt" onclick="deleteElement(${i})"></i></td>
                </tr>`
    }
    tbody.innerHTML = result ; 
}

function createElement(){

    let currentresult = {
        cid:counterId ,
        cname:"",
        ccategory:"",
        cprice:0,
        cdescription:""
    };

    let cnameValue=cname.value;
    let ccategoryValue=ccategory.value;
    let cpriceValue=cprice.value;
    let cdescriptionValue=cdescription.value;

    currentresult.id=counterId;
    currentresult.cname=cnameValue ; 
    currentresult.ccategory=ccategoryValue;
    currentresult.cprice=cpriceValue;
    currentresult.cdescription=cdescriptionValue;

    Arr_Results.push(currentresult);
    counterId++;
    localStorage.setItem('id',counterId.toString());
    localStorage.setItem('courses',JSON.stringify(Arr_Results)) ; 

    displayElements(Arr_Results);
    clearfields();
}

let updateElement = (index)=>{

    Arr_Results[index].cname=cname.value;
    Arr_Results[index].ccategory=ccategory.value;
    Arr_Results[index].cprice=cprice.value;
    Arr_Results[index].cdescription=cdescription.value;

    localStorage.setItem('courses',JSON.stringify(Arr_Results)) ;

    displayElements(Arr_Results);
    clearfields();
    add.setAttribute('state_btn','add'); /* To Change The Btn from [update] to [add] */
    changesAddBtn(); /* Change the background and innerHTML in [add Button] */
}

/* Put The VAlus In Form */
function displayUpdatedElementInForm(index){

    cname.value=Arr_Results[index].cname;
    ccategory.value=Arr_Results[index].ccategory;
    cprice.value=Arr_Results[index].cprice;
    cdescription.value=Arr_Results[index].cdescription;

    add.setAttribute('state_btn','update');

    changesAddBtn(); 

    updatedIndex=index;

}
function changesAddBtn(){

    let state = add.getAttribute('state_btn');

    if(state==='add')
    {
        add.innerHTML='add';
        add.style.backgroundColor='green';
    }
    else{
        add.innerHTML='update';
        add.style.backgroundColor='orange';
    }

}

let deleteElement = (index)=>{

    Arr_Results.splice(index, 1);

    localStorage.setItem('courses',JSON.stringify(Arr_Results)) ;

    displayElements(Arr_Results);
} 

function clearfields(){
    cname.value=null;
    ccategory.value=null;
    cprice.value=null;
    cdescription.value=null;
}
