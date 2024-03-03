// get value
let input=document.getElementById("input")
let btn=document.getElementById("btn")
let list=document.getElementById("foodlist")
let noListEl=document.getElementById("no-list")
let statusEl=document.getElementById("status")
//data persistance

document.addEventListener("DOMContentLoaded",()=>{
    const fetchData=[...JSON.parse(localStorage.getItem("item"))]
    fetchData.forEach((event)=>{
        const li=document.createElement("li")
        const divItem=document.createElement("div")
        const divIcon=document.createElement("div")
        const textNode=document.createTextNode(event.food)
        li.className="list-item";
        divItem.append(textNode);
        li.append(divItem);
        li.append(divIcon);
        divIcon.parentElement.setAttribute("onclick","remove(event)");
        divIcon.innerHTML=`<i class="fa fa-times"></i>`;
        list.append(li);
    })
    uiRefresh()
})
//reusable function for add item
const enter=()=>{
    const li=document.createElement("li")
    const divItem=document.createElement("div")
    const divIcon=document.createElement("div")
    const textNode=document.createTextNode(input.value)
    li.className="list-item";
    divItem.append(textNode);
    li.append(divItem);
    li.append(divIcon);
    divIcon.parentElement.setAttribute("onclick","remove(event)");
    divIcon.innerHTML=`<i class="fa fa-times"></i>`;
    list.append(li);
    uiRefresh()
    localStorage.setItem("item",JSON.stringify([...JSON.parse(localStorage.getItem("item")||"[]"),{food:input.value}]))
    
}
btn.addEventListener(("click"),()=>{
    if(input.value!=""){
        enter()
    }
});
input.addEventListener("keyup",(eve)=>{
    if(eve.key=='Enter' && input.value!="")
    {
        enter()
        
    }
})

function remove(event)
{
    const beforeValue=event.target.parentNode.parentNode;
    beforeValue.remove()
    const fetchData=[...JSON.parse(localStorage.getItem("item"))]
    fetchData.forEach((itm)=>{
        if(itm.food===beforeValue.innerText)
        {
            fetchData.splice(fetchData.indexOf(itm),1)
        }
    });
    
    localStorage.setItem("item",JSON.stringify(fetchData));
    uiRefresh()
}


const uiRefresh=()=>{
    statusEl.innerText=`you have ${list.children.length} items`
    list.children.length>0? ((noListEl.hidden=true),(statusEl.hidden=false)):((noListEl.hidden=false),(statusEl.hidden=true));
}
