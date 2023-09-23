let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mood = 'creat'
let tmp;
// console.log(title,price,taxes,ads,discount,total,count,category,submit);

function getTotal(){

if (price.value !='') {
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML = result;
    total.style.background ='#040'
}else{
    total.innerHTML='';
    total.style.background ='red'
}
}
// creat product
let dataPro;
if (localStorage.product !=null) {
    dataPro=JSON.parse(localStorage.product)
} else {
    dataPro = [];
}




submit.onclick = function(){

let newPro = {
title:title.value,
price:price.value,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML,
count:total.value,
category:category.value,

}
if(mood='Creat')
{
    if (newPro.count >1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro)
        }
    } else {
        
        dataPro.push(newPro)
    }
}
else{
    dataPro[tmp] =newPro;
    mood = 'Creat'
    submit.innerHTML='Creat'
    count.style.display="block";
}

localStorage.setItem('product' , JSON.stringify(dataPro))
// console.log(dataPro);
cleardata();
showdata();
}


function cleardata()
{
title.value= '';
price.value= '';
ads.value= '';
discount.value= '';
count.value= '';
category.value= '';
taxes.value= '';
total.innerHTML= '';











}

// read

function showdata()
{
let table = '';
for (let i = 0; i < dataPro.length; i++) {
   table += `<tr>
   <td>${i}</td>
   <td>${dataPro[i].title}</td>
   <td>${dataPro[i].price}</td>
   <td>${dataPro[i].taxes}</td>
   <td>${dataPro[i].ads}</td>
   <td>${dataPro[i].discount}</td>
   <td>${dataPro[i].total}</td>
   <td>${dataPro[i].category}</td>
   <td><button onclick="updateData(${i})" id="update" >update</button></td>
   <td><button onclick="deletedata(${i})" id="delete" >delete</button></td>
</tr>`;
    
}
document.getElementById('tbody').innerHTML=table;
let btndelete =document.getElementById('deleteAll')
if (dataPro.length >0) {
    btndelete.innerHTML=`<button onclick ="deleteALl(${dataPro.length})" >delete All</button>`
} else {
    btndelete.innerHTML=``;
}
}
showdata();




// delete element


function deletedata(i)
{
dataPro.splice(i,1)
localStorage.product = JSON.stringify(dataPro)
showdata();
}



// delete all
function deleteALl(){
localStorage.clear()
dataPro.splice(0)
showdata()
}



// update 

function updateData(i) {

    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
getTotal()
count.style.display='none'
category.value=dataPro[i].category;
submit.innerHTML='Update'
mood = 'Update'
tmp=i;
scroll({
    top:0,behavior:"smooth"
})
// showdata()

}