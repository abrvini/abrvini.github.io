let dummyTransactions = localStorage.transactions ? JSON.parse(localStorage.transactions) : []

const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputTrasactionDescription = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const gravaTransactions = () => localStorage.transactions = JSON.stringify(dummyTransactions)

const addTransactonsIntoDOM  = ({amount,name,id}) =>{ 
   const operator = amount < 0 ? '-': '+'
   const CSSClass = amount < 0 ? 'minus':'plus'
   const amountWithoutOperator = Math.abs(amount).toFixed(2)

   const liEl = document.createElement('li')

   liEl.classList.add(CSSClass)

   liEl.innerHTML = `${name} <span>${operator} R$ ${amountWithoutOperator}</span><button onclick='removeTransaction(${id})' class="delete-btn">x</button>`

   transactionsUl.prepend(liEl)
}

const removeTransaction = ID => {
    dummyTransactions = dummyTransactions.filter(({id}) => id != ID)
    init() 
}

const Soma = (acumulator,{ amount }) => acumulator + amount

const total = (filtro) => 
     dummyTransactions
    .filter(filtro)
    .reduce(Soma,0)
    .toFixed(2)

const updateBalanceValues = () => {
    const filtoReceitas = ({amount}) => amount > 0
    const filtoDespesas =  ({amount}) => amount < 0
    const filtroTotal = () => true

    incomeDisplay.textContent  = `R$ ${total(filtoReceitas)}`
    expenseDisplay.textContent = `R$ ${ Math.abs(total(filtoDespesas)).toFixed(2)}`
    balanceDisplay.textContent = `R$ ${ total(filtroTotal)}`
}

const init = () =>{
   transactionsUl.innerHTML = ''
   gravaTransactions()
   dummyTransactions.forEach(addTransactonsIntoDOM) 
   updateBalanceValues()
   inputTransactionAmount.value = ''
   inputTrasactionDescription.value = ''
}

init()

const generateID = () => Math.round(Math.random() * 1000)

const garvaTransaction = (name, amount) =>{

    dummyTransactions.push({ 
        id: generateID() ,
        name:name, 
        amount: Number(amount)})

    init()


form.addEventListener('submit', event => {
    event.preventDefault()
    
    const transactionName = inputTrasactionDescription.value.trim()
    const transactionAmount =  inputTransactionAmount.value.trim()

    if(transactionAmount === '' || transactionName === '' || transactionAmount === '0'){
        alert('Preencha tanto o valor da descrição, quanto o valor da transação')
        return
    }
    garvaTransaction(transactionName,transactionAmount)
  
})