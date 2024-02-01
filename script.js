// get element like button and input

// localStorage.removeItem("listOfItem"); // removing data from loacl storage
const inputTitle = document.getElementById("inputTitle");
const inputDescription = document.getElementById("Description");
const addItemToListBtn = document.getElementById("addItemBtn");

//flag for switch mode
let editmode = false;


let item;

//function for adding data in localstorage
function addDataInLocal() {


   // making object of title and description
  let listItemObject = {
    id: new Date(),
    title: `${inputTitle.value.trim()}`,
    description: `${inputDescription.value.trim()}`,
  };


 // setting the data on local storage
  if (localStorage.getItem("listOfItem") == null) {
    localStorage.setItem("listOfItem", "[]");
    let oldData = JSON.parse(localStorage.getItem("listOfItem"));
    oldData.push(listItemObject);

    localStorage.setItem("listOfItem", JSON.stringify(oldData));
  } else if (localStorage.getItem("listOfItem")) {
    let oldData = JSON.parse(localStorage.getItem("listOfItem"));
    oldData.push(listItemObject);

    localStorage.setItem("listOfItem", JSON.stringify(oldData));
  }
}



//renderList on page from local storage

function renderList(array) {
  const listConatiner = document.getElementById("listConatiner");
  const listContainerReplace = document.createElement("div");
  listContainerReplace.id = "listConatiner";
  array.forEach((element) => {
    const listItem = document.createElement("div");
    listItem.className = "listItems";

    listItem.innerHTML = `<h1 class="listItemTitle">${element.title}</h1>
         <p class="listItemDescription">${element.description}</p>
         <div>
         <button class="editBtn">Edit</button>
         <button class="deleteBtn">Delete</button>
         <div>`;

    listContainerReplace.appendChild(listItem);// appending item
  });
  listConatiner.replaceWith(listContainerReplace); 
}

//delete the specfic item

function deleteSpecificItem() {
  let itemdeleteBtns = document.querySelectorAll(".deleteBtn");
  itemdeleteBtns.forEach((element, key) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Are sure you want delete ")) {
        let oldData = JSON.parse(localStorage.getItem("listOfItem"));
        oldData.splice(key, 1);                                       // delete using splice
        localStorage.setItem("listOfItem", JSON.stringify(oldData));
        renderList(JSON.parse(localStorage.getItem("listOfItem")));
        deleteSpecificItem();
        editSpecificItem();
      }
    });
  });
}

//edit specific data

function editSpecificItem() {
  let allEditBtn = document.querySelectorAll(".editBtn");
  allEditBtn.forEach((el, key) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("are you sure to edit")) {
        let data = JSON.parse(localStorage.getItem("listOfItem"));
        item = data[key];
        fillDataIn(item);
        editmode = true;

        document.querySelectorAll(".editBtn").forEach((el)=>{
          el.style.setProperty("visibility","hidden")
        })

      }
    });
  });
  return editmode;
}

function fillDataIn(items) {
  document.getElementById("inputTitle").value = items.title;
  document.getElementById("Description").value = items.description;
}

if (localStorage.getItem("listOfItem") != null) {
  renderList(JSON.parse(localStorage.getItem("listOfItem")));
  editSpecificItem();
  deleteSpecificItem();
}

// adding event on button for add item into list

addItemToListBtn.addEventListener("click", (e) => {
  e.preventDefault();

  /// if edit mode
  if (editmode) {
   
    let oldData = JSON.parse(localStorage.getItem("listOfItem"));
    oldData.forEach((element, key) => {
      if (element.id === item.id) {
        let obj = {
          id: item.id,
          title: document.getElementById("inputTitle").value.trim(),
          description: document.getElementById("Description").value.trim(),
        };
        // splice method is used for add
        oldData.splice(key, 1, obj);
        alert("item is updated");
        document.querySelectorAll(".editBtn").forEach((el)=>{
          el.style.setProperty("visibility","visible");
        })
        
       
      }

    });

    localStorage.setItem("listOfItem", JSON.stringify(oldData));
    renderList(JSON.parse(localStorage.getItem("listOfItem")));
    document.getElementById("inputTitle").value = "";
    document.getElementById("Description").value = "";
    editSpecificItem();
    deleteSpecificItem();
    editmode = false;
  }
   else {
    if (inputTitle.value.trim() && inputDescription.value.trim()) {
     if(confirm("Are you sure  want add"))
      {addDataInLocal();
      renderList(JSON.parse(localStorage.getItem("listOfItem")));
      document.getElementById("inputTitle").value = "";
      document.getElementById("Description").value = "";
      editSpecificItem();
    deleteSpecificItem();}
    }
    else{
      alert("All field are Requied")
    }
    
  }
});
