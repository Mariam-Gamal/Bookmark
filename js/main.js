//varibales
var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn")
var deleteBtn = document.getElementById("deleteBtn")
var tBody = document.getElementById("tBody");

var allBookmark=[];



// LOCAL STORAGE
if(localStorage.getItem("bookmark") != null){
    allBookmark = JSON.parse(localStorage.getItem("bookmark"));
    displayallBookmark();
}


 function search(){
    for(var i=0 ; i<allBookmark.length ; i++){
      if(allBookmark[i].bookmarkName.toLowerCase() == bookmarkName.value.toLowerCase()){
            alert("bookmark Name is already there")
            return true 
        }
    }
    }
// ADD
submitBtn.addEventListener("click", addBookmark)
function addBookmark(){
    if( validateName() && validateURL() && !search() ){
    var bookmark={
    bookmarkName:bookmarkName.value,
    bookmarkURL:bookmarkURL.value,
    }
    allBookmark.push(bookmark);
    localStorage.setItem("bookmark", JSON.stringify(allBookmark));
    displayallBookmark();
    clearForm();
    } 
    else{
    var rules = document.getElementById("rules");
    var closeBtn = document.getElementById("closeBtn");

    rules.classList.replace("d-none" , "d-block")
    closeBtn.addEventListener("click", function(){
        rules.classList.replace("d-block" , "d-none")
    }); 
}
}

// VALIDATION

function validateName(){
    var regx = /^\w{2,}$/;
    return regx.test(bookmarkName.value);
}
function validateURL(){
    var regxURL = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return regxURL.test(bookmarkURL.value);
}

bookmarkName.addEventListener("keydown", validate)
function validate(){
if(validateName()){
    bookmarkName.classList.add('is-valid')
    bookmarkName.classList.remove('is-invalid')
} else{
    bookmarkName.classList.remove('is-valid')
    bookmarkName.classList.add('is-invalid')
}
}
bookmarkURL.addEventListener("keyup", validateU)
function validateU(){
if(validateURL() == true){
    bookmarkURL.classList.add('is-valid')
    bookmarkURL.classList.remove('is-invalid')
}else{
    bookmarkURL.classList.remove('is-valid')
    bookmarkURL.classList.add('is-invalid')
}
}

// DISPLAY
function displayallBookmark(){
    var box =""
    for(var i=0 ; i<allBookmark.length ; i++){
            box+=`
            <tr>
            <td>${i+1}</td>
            <td>${allBookmark[i].bookmarkName.charAt(0).toUpperCase() + allBookmark[i].bookmarkName.slice(1) }</td>
            <td> <button class="btn  btn-visit"><a class="text-decoration-none text-white" href="${allBookmark[i].bookmarkURL}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></button></td>
            <td> <button onclick="deleteItem(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
            `
    }
    tBody.innerHTML=box;  
}

function clearForm(){
    bookmarkName.value="";
    bookmarkURL.value="";   
}

// DELETE
function deleteItem(index){
    allBookmark.splice(index , 1)
    localStorage.setItem("bookmark", JSON.stringify(allBookmark));
    displayallBookmark();
}

    console.log(allBookmark);

