const name=document.getElementById('name');
const price=document.getElementById('price');
const category=document.getElementById('category');
const btn=document.getElementById('btn');
const table=document.getElementById('table');
const form=document.getElementById('form');
function validate() {
    if (!name.value) {
        name.style.outlineColor = 'red';
        name.focus();
        return;
    }

    if (!price.value || !validatePrice(price.value)) {
        price.style.outlineColor = 'red';
        price.focus();
        return;
    }
}


function createAndSave (){
    let dataLocalStorage=localStorage.getItem('phones');
    let data=[];

    if(dataLocalStorage){
        data=JSON.parse(dataLocalStorage);
    }

    let phones={};
    phones.id=Date.now();
    phones.name=name.value;
    phones.price=price.value;
    phones.category=category.value;


    data.push(phones);
    localStorage.setItem('phones', JSON.stringify(data));
    createRow(phones, data.length-1);
    form.reset();
}


btn.addEventListener('click', function() {
    validate();
    createAndSave();

    
});

window.onload=function(){
    let data=localStorage.getItem('phones')?JSON.parse(localStorage.getItem('phones')):[];
    if(data.length){
        data.forEach((phones,index) =>{
            createRow(phones, index);
        })
    }
};


function validatePrice(price) {
    return !isNaN(price);
}
function createRow(phones, index) {
    let strRow = `
        <tr>
            <td>${index + 1}</td>
            <td>${phones.name}</td>
            <td>${phones.price}</td>
            <td>${phones.category}</td>
            <td>
                <span>delete</span>
                <span>update</span>
            </td>
        </tr>
    `;

    table.insertAdjacentHTML('beforeend', strRow);
}

