const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener("click",addNote);

function addNote(){

    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fas fa-save"></i> 
        <i class="trash fas fa-trash"></i> 
    </div>
     <textarea></textarea>`;

    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    const textarea = note.querySelector("textarea");

    save.addEventListener("click",saveNotes); //onclick of save icon, data saved.
    textarea.addEventListener("input",saveNotes);
    trash.addEventListener("click",()=>{

        note.remove(); // to remove the node / element. 
        saveNotes(); //function to save data in local storage

    });


    main.appendChild(note);

}

function saveNotes(){

    const notes = document.querySelectorAll(".note textarea"); //select all textareas in node.
    const data = Array.from(notes).map(note => note.value); //allnodes converted into array using array.from() function  
    //so that we can use array functions like map on it.
    console.log(notes,data);

    if(data.length ===""){
        localStorage.removeItem("notes"); //if notes empty, then remove data from local storage.
    }else{
        localStorage.setItem("notes",JSON.stringify(data)); //first data converted to json using json.stringify() function.
        // and saves it in the local storage under the key "notes" using localStorage.setItem("notes", JSON.stringify(data)).
    }

}

function loadNotes(){

    const lsNotes = JSON.parse(localStorage.getItem("notes")); //getItem() used to get value of key from local storage. 
    //The retrieved value is JSON, so it WILL parsed using JSON.parse().

    if(lsNotes !==null){
        lsNotes.forEach(noteText =>{

        addNote();

        const notes = document.querySelectorAll(".note textarea");
        const lastNote = notes[notes.length -1];
        lastNote.value = noteText;  

        });
    }else{
        addNote(); //everytime we open browser, one box will always be showing. 
    }

}

loadNotes();