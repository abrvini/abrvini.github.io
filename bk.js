const dados = [
    {
        descricao:"Lista C0ompras",
        novoGrupo:false,
        selected:false,
        grupos:[{
            descricao:"Merceria",
            selected:true,
            itens:[{
                descricao:"Arroz",
                qtd:10,
                unidade:"KG",
                preco:4.56
            },{
                descricao:"Feijão",
                qtd:4,
                unidade:"LT",
                preco:5.78
            },{
                descricao:"Leite",
                qtd:10,
                unidade:"LT",
                preco:3.45
            }]
        },{
            descricao:"Limpeza",
            selected:true,
            itens:[{
                descricao:"Detergente",
                qtd:4,
                unidade:"UN",
                preco:1.75
            }]
        }]
    },{
        descricao:"Feira",
        novoGrupo:false,
        selected:false,
        grupos:[{
            descricao:"Verduras",
            selected:true,
            itens:[{
                descricao:"Alface",
                qtd:2,
                unidade:"UN",
                preco:2.00
            },{
                descricao:"Rucula",
                qtd:1,
                unidade:"UN",
                preco:2.40
            }]
        },{
            descricao:"Frutas",
            selected:true,
            itens:[{
                descricao:"Banana",
                qtd:1,
                unidade:"UN",
                preco:7.89
            }]
        }]
    }]

const geral = document.querySelector("#geral")

const idForm = document.querySelector("#id")

const totalizaLista = lista => {
    return lista.grupos
    .reduce((ac,grupo) =>
        ac + grupo.itens
        .reduce((acc,{preco,qtd})=>
            acc+(preco*qtd)
            ,0)
    ,0)
}

const totalizaGrupo = grupo => {
    return  grupo.itens
        .reduce((acc,{preco,qtd})=>
            acc+(preco*qtd)
            ,0).toFixed(2)
}

const inserirHeaderLista = (idxLista,lista) => {

    geral.innerHTML.clear

    const divListas = document.createElement('DIV')
    divListas.classList.add('lista')

    const divHeaderLista = document.createElement('DIV')
    divHeaderLista.classList.add('headerLista')

    const div1 = document.createElement('DIV')
    const div2 = document.createElement('DIV')

    const h4El = document.createElement('H4')
    const h4El2= document.createElement('H4')

    h4El.textContent = lista.descricao

    div1.append(h4El)

    divHeaderLista.append(div1)

    divListas.append(divHeaderLista) 

    h4El2.textContent = 'R$ ' +  totalizaLista(lista).toFixed(2)

    div2.append(h4El2)

    const bntDelete = document.createElement('BUTTON')
    bntDelete.classList.add('delete-btn')
    bntDelete.setAttribute('onclick',`removeLista(${idxLista})`)
    bntDelete.textContent = "X"

    const bntEditar = document.createElement('BUTTON')
    bntEditar.classList.add('delete-btn')
    bntEditar.textContent = "#"

    divHeaderLista.append(div2)

    divHeaderLista.append(bntDelete)

    divListas.append(divHeaderLista)

    const divGrupos = document.createElement('DIV')
    divGrupos.classList.add('grupos')

    inserirHeaderGrupo(idxLista,divGrupos,lista.grupos)

    divListas.append(divGrupos)

    geral.append(divListas)
}

const inserirHeaderGrupo = (idxLista,divGrupos,grupos) => {

    grupos.forEach((grupo,index) => {
  
        const divGrupo = document.createElement('DIV')          
        divGrupo.classList.add('grupo')

        const divHeaderGrupo = document.createElement('DIV')
        divHeaderGrupo.classList.add('headerGrupo')
   
        const div1 = document.createElement('DIV')
        const div2 = document.createElement('DIV')
        const div3 = document.createElement('DIV')

        const h4El = document.createElement('H4')
        h4El.textContent = grupo.descricao

        const h4El2= document.createElement('H4')
        h4El2.textContent = 'R$ ' + totalizaGrupo(grupo)

        const bntDelete = document.createElement('BUTTON')
        bntDelete.classList.add('delete-btn')
        bntDelete.setAttribute('onclick',`removeGrupo(${idxLista},${index})`)
        bntDelete.textContent = "X"

        const bntNovoItem = document.createElement('BUTTON')
        bntNovoItem.classList.add('delete-btn')
        bntNovoItem.setAttribute('onclick',`addItem(${idxLista},${index})`)
        bntNovoItem.textContent = "+"
    
        const bntEditar = document.createElement('BUTTON')
        bntEditar.classList.add('delete-btn')
        bntEditar.textContent = "#"
       
        div1.append(h4El)
        div2.append(h4El2)
        // div3.append(bntNovoItem)
        // div3.append(bntDelete)
       
        divHeaderGrupo.append(div1)
        divHeaderGrupo.append(div2)
        divHeaderGrupo.append(div3)
        // divHeaderGrupo.append(bntNovoItem)
        // divHeaderGrupo.append(bntDelete)
        // divHeaderGrupo.setAttribute('onclick',`clickGrupo('${grupo.descricao}')`)

        divGrupo.append(divHeaderGrupo)

        inserirItemDOM(idxLista,index, divGrupo,grupo.itens)

        divGrupos.append(divGrupo)
    })
}

const editItem = (idxLista,idxGrupo,index) =>{
    console.log('khkjhkj')
    const item =  dados[idxLista].grupos[idxGrupo].itens[index]

    form.style.display = "block"
    geral.style.display = "none"

    const descricaoEl = document.querySelector("#text")
    const unidadeEl = document.querySelector("#unidade")
    const qtdEl = document.querySelector("#qtd")
    const precoEl = document.querySelector("#preco")

    descricaoEl.value = item.descricao
    qtdEl.value = item.qtd
    unidadeEl.value = item.unidade
    precoEl.value = item.preco

    idForm.value = `{"idLista": ${idxLista},"idGrupo":${index}}`
}

const addItem = (idxLista,index) => {
    geral.style.display = 'none'
    form.style.display = "block"
    idForm.value = `{"idLista": ${idxLista},"idGrupo":${index}}`
}


form.addEventListener('submit', event => {
    event.preventDefault()
    
    const f = JSON.parse(idForm.value)

    const descricaoEl = document.querySelector("#text")
    const unidadeEl = document.querySelector("#unidade")
    const qtdEl = document.querySelector("#qtd")
    const precoEl = document.querySelector("#preco")
         
    const novoItem = {
    descricao:descricaoEl.value,
    qtd:Number(qtdEl.value),
    unidade:unidadeEl.value,
    preco:Number(precoEl.value)
    } 

    dados[f.idLista].grupos[f.idGrupo].itens.push(novoItem)

    renderizaLista()

    form.style.display = "none"
    geral.style.display = "block"

    descricaoEl.value = ''
    qtdEl.value = 0.000
    unidadeEl.value = 'UN'
    precoEl.value = 0.00
})

form.addEventListener('reset', event => {
    event.preventDefault()
    console.log('kjlk')
    form.style.display = "none"
    geral.style.display = "block"
      
})

const removeItem = (idxLista,idxGrupo,index) =>{

 const item = dados[idxLista].grupos[idxGrupo].itens[index]

 const id = dados[idxLista].grupos[idxGrupo].itens.indexOf(item)

 dados[idxLista].grupos[idxGrupo].itens.splice(id,1)

 renderizaLista()

}

const clickGrupo = texto =>{
    console.log(texto)
}

const removeGrupo = (idxLista,index) =>{
    const grupo = dados[idxLista].grupos[index]

    const id = dados[idxLista].grupos.indexOf(grupo)

    dados[idxLista].grupos.splice(id,1)

    renderizaLista()
}

const removeLista = (index) =>{
    dados.splice(index,1)
    renderizaLista()
}

const inserirItemDOM = (idxLista,idxGrupo, divGrupo,itens) => {

    itens.forEach((item,index) => {

    const divItem = document.createElement('DIV')
    divItem.classList.add('item')

    const divItem_1_1 = document.createElement('DIV')
    divItem_1_1.classList.add('item_1')
    const divItem_1_2 = document.createElement('DIV')
    divItem_1_2.classList.add('item_1') 

    const spanQtdUn = document.createElement('SPAN')
    const spanPreco = document.createElement('SPAN')
    const spanTotalItem = document.createElement('SPAN')

    const bntDelete = document.createElement('BUTTON')
    bntDelete.classList.add('delete-btn')
    bntDelete.setAttribute('onclick',`removeItem(${idxLista},${idxGrupo},${index})`)
    bntDelete.textContent = "X"

    const bntEditar = document.createElement('BUTTON')
    bntEditar.classList.add('delete-btn')
    bntEditar.setAttribute('onclick',`editItem(${idxLista},${idxGrupo},${index})`)
    bntEditar.textContent = "#"

    divItem_1_1.innerHTML += item.descricao

    spanQtdUn.textContent = item.qtd + ' ' + item.unidade
    spanPreco.textContent = '$ ' + item.preco.toFixed(2)
    spanTotalItem.textContent = '$ ' + (item.qtd * item.preco).toFixed(2)

    divItem_1_2.append(spanQtdUn)
    divItem_1_2.append(spanPreco)
    divItem_1_2.append(spanTotalItem)
    divItem_1_2.append(bntEditar)
    divItem_1_2.append(bntDelete)

    divItem.append(divItem_1_1)
    divItem.append(divItem_1_2)
    divGrupo.append(divItem)
})

}

const renderizaLista = () =>{
    geral.innerHTML = ''
    dados.forEach((lista,index) => {
        inserirHeaderLista(index,lista)
    })
}

renderizaLista()


