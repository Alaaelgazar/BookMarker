var siteList =[];
var currentIndex=0;
var Submitbutton = document.querySelector(".submit");
var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var btnDelete = document.querySelector(".button-delete");
var btnvisit = document.querySelector(".btn-visit");
var closebtn = document.getElementById("btnClose");
var closepage = document.querySelector(".closepage");
var invalidName = document.querySelector(".invalidName");
var invalidurl = document.querySelector(".invalidurl");
var ragaxName =/^[A-Za-z0-9]{3,}/;
var ragaxsite =/^[A-Za-z0-9]{3,}/;
var httpsRegex = /^https?:/g;
var urlregax = /^https?:/g;

if(localStorage.getItem("ourlocalstorage")!=null){
    siteList=JSON.parse(localStorage.getItem("ourlocalstorage"))
    displaysite();
}
Submitbutton.addEventListener("click", function(){
    if(ragaxsite.test(siteNameInput.value)==true && urlregax.test(siteURLInput.value)==true){
        addsite();
    }
    else{
        closepage.classList.replace("d-none", "d-flex")
    }
})
closebtn.addEventListener("click", function(){
    closepage.classList.replace("d-flex","d-none")
})
function validationname(){
    var text = siteNameInput.value;
    if(ragaxName.test(text)==true){
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        invalidName.classList.remove('d-block');
        invalidName.classList.add('d-none');
    }
    else{
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        invalidName.classList.add('d-block');
        invalidName.classList.remove('d-none');

    }
}

function validationurl(){
    var sitelink = siteURLInput.value;
    if (httpsRegex.test(sitelink)==true){
        siteURLInput.classList.add('is-valid');
        siteURLInput.classList.remove('is-invalid')
        invalidurl.classList.remove('d-block');
        invalidurl.classList.add('d-none');
    }
    else{
        siteURLInput.classList.add('is-invalid');
        siteURLInput.classList.remove('is-valid');
        invalidurl.classList.add('d-block');
        invalidurl.classList.remove('d-none');

    }
}
// -------Add--------
function addsite(){
    site ={
        name: siteNameInput.value,
        url : siteURLInput.value,
    }
        siteList.push(site);
        localStorage.setItem("ourlocalstorage",JSON.stringify(siteList))
        displaysite();
        clearInputs();
}
// --display----
function displaysite(){
    var cartona="";
    for(var i=0 ; i <siteList.length ; i++){
        cartona+=  ` <tr>
        <td> ${i+1}</td>
        <td>${siteList[i].name}</td>
        <td><button class="btn btn-visit text-white" onclick="visitsite(${i})">
                <i class="fa-solid fa-eye pe-2"></i> <a class="text-decoration-none text-white" href="${siteList[i].url}" target="_blank">Visit</a>
            </button>
        </td>
        <td><button class="btn button-delete bg-danger pe-2 text-white" onclick="deletesite(${i})" ">
        <i class="fa-solid fa-trash-can"></i>
        Delete
        </button></td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
    currentIndex = i ;
}
// -------clear------
function clearInputs(){
    siteNameInput.value="";
    siteURLInput.value="";
}
// -------search ------
function searchsite(userword){
    var cartona="";
    for(var i=0;i<siteList.length;i++){
        if(siteList[i].name.includes(userword)){
            cartona+=  ` <tr>
            <td> ${i+1}</td>
            <td>${siteList[i].name}</td>
            <td><button class="btn btn-visit text-white" onclick="visitsite(${i})">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
            </td>
            <td><button class="btn button-delete bg-danger pe-2 text-white" onclick="deletesite(${i})" ">
            <i class="fa-solid fa-trash-can"></i>
            Delete
            </button></td>
        </tr>`
        }
        
    }
    document.getElementById("tableBody").innerHTML = cartona;
}
//    -----------delete------------
function deletesite(index){
    siteList.splice(index,1);
    localStorage.setItem("ourlocalstorage" , JSON.stringify(siteList))
    displaysite();
}






