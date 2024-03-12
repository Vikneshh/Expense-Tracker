const balance=document.getElementById("balance");
const moneyPlus=document.getElementById("money-plus");
const moneyMinus=document.getElementById("money-minus");
const list=document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("amount");
const button=document.querySelector(".delete-btn");

text.focus();
// const dummyTransactions = [
//       { id: 1, text: 'Flower', amount: -20 },
//       { id: 2, text: 'Salary', amount: 300 },
//       { id: 3, text: 'Book', amount: -10 },
//       { id: 4, text: 'Camera', amount: 150 }
//     ];

//parsing it from string to an array
    const localStorageTransactions=JSON.parse(localStorage.getItem("transactions"))
    //if there is something in it then add it tob local transaction else leave it as an empty array.
    let transactions=localStorage.getItem("transactions")!== null ?localStorageTransactions:[];

    //adding the transactions by the user

    function addTrans(e){
        e.preventDefault();

        if(text.value.trim()===''||amount.value.trim()===""){
            alert("Please add a text and the amount")
        }
        else{
            // creating an objects
            // creating ids through the function generateId
            const trans={
                id:generateId(),
                text:text.value, 
                //you can also use + sign infront of them to convert them to a number
                amount:parseInt(amount.value)
            }
            transactions.push(trans);
            addTransactions(trans);
            updateValues();

            //after updating the array we have to update the local storage

            updateLocalStorage();

            text.value='';
            amount.value='';
           
        }
    }

    function generateId(){
        return Math.floor(Math.random()*100000000)
    }

    //Add transactions in the DOM

    function addTransactions(transaction){
        //get sign
        const sign=transaction.amount<0?'-':'+';

        const item=document.createElement("li");

        //add the classes based on the sign value

        item.classList.add(transaction.amount<0?'minus':'plus');

        item.innerHTML=`${transaction.text} <span>${sign}₹${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`
        list.appendChild(item);
    }

    //update the balances income and the expenses from the transactions

    function updateValues(){
        //by mapping through transactions we are creating a new array only consists of amounts which makes the process of adding and subtracting the transactions amounts easier for us.
        const amounts=transactions.map(transactions=>transactions.amount);
        const total=amounts.reduce((a,b)=>a+=b,0).toFixed(2);

        const income=amounts.filter(item=>item>0).reduce((a,b)=>a+=b,0).toFixed(2);
//remember we dont want the negative sifgnn in the expense so remove that by  multilying the answer with -1.
        const expense=(
            amounts.filter(item=>item<0).reduce((a,b)=>
            (a+=b),0)*-1).toFixed(2)
        
            // Settting the inner html

            balance.innerHTML=`₹${total}`;
            moneyPlus.innerHTML=`+₹${income}`;
            moneyMinus.innerHTML=`-₹${expense}`;
    }


    //removing transactions by the id

    function removeTransaction(id){
        transactions=transactions.filter(transaction=>transaction.id!==id);
        //after removing the transaction too we have to update the local storage.
        updateLocalStorage();
        init()
    }

    //update  localstorage transactions

function updateLocalStorage(){
    localStorage.setItem("transactions",JSON.stringify(transactions));
}
    //init app
    function init(){
        list.innerHTML='';
        transactions.forEach(addTransactions);
        updateValues()
    }
init()

//event listeners

form.addEventListener("submit",addTrans);