const add = document.querySelectorAll('.add');
const inputs = document.querySelectorAll('input');
const items = JSON.parse(localStorage.getItem("items")) || []


items.forEach(item => {
    createElement(item)
})

add.forEach(btn => {
    btn.addEventListener('click', clickou);
})

inputs.forEach(input => {
    input.addEventListener('keydown',enter);
})

function clickou(event){
    event.preventDefault();
    processInput(event.target)
}


function enter(event){
    if(event.key === 'Enter'){
    event.preventDefault();
    processInput(event.target.nextElementSibling)
    }
}

function processInput(btn){
    let item = btn.previousElementSibling;
    let value = item.value
    if(!value){
        alert("Preencha corretamente a tarefa!");
    }else{
   
    const list = btn.parentNode.nextElementSibling;
    const listId = list.id;
    const title = btn.parentNode.parentNode.classList[0];

  
    const exists = items.find(element => element.name === value && element.title == title)

    const CurrentItem = {
        "name": value,
        "list": listId,
        "title": title,
    }
    if(exists){
        CurrentItem.id = exists.id
        alert('Essa tarefa já existe')
        updateElement(CurrentItem)

        // items[exists.id] = CurrentItem;
    }else{
       
      
        CurrentItem.id = items[items.length-1] ? (items[items.length-1].id +1): 0;
        createElement(CurrentItem);   
        items.push(CurrentItem)
        
    }
    localStorage.setItem("items", JSON.stringify(items))
    console.log(items)
    item.value = ''
    }
}
    



function createElement(CurrentItem){
    const newItem = document.createElement('li');
    newItem.classList.add('item');
    newItem.classList.add(`${CurrentItem.title}__bg`)
    newItem.dataset.id = CurrentItem.id
    
    const finishedMessage = document.createElement('p')
    finishedMessage.innerHTML="Finalizado com sucesso. Parabéns";
    finishedMessage.classList.add('message')
   finishedMessage.classList.add('sumir')
 

   

    const trash = document.createElement('i');
    trash.classList.add('fas');
    trash.classList.add('fa-trash');
    trash.classList.add('lixeira');

    trash.addEventListener('click', function(){
        delElement(this.parentNode, CurrentItem.title, CurrentItem.name)
    })

    newItem.addEventListener('click', ()=>{
        finishedMessage.classList.toggle('sumir')
         newItem.classList.toggle('finished')
        
    })


    newItem.innerHTML += CurrentItem.name;
    newItem.appendChild(trash)
    newItem.appendChild(finishedMessage)

    const list = document.getElementById(CurrentItem.list)
    list.appendChild(newItem)

   
}

function updateElement(CurrentItem){
    console.log(document.querySelector("[data-id='"+CurrentItem.id+"']"))
}

function delElement(tag,title, name){
    tag.remove()

    items.splice(items.findIndex(element => element.title === title && element.name === name),1)  
    localStorage.setItem("items", JSON.stringify(items))
   
}
