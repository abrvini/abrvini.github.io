var app = new Vue({
    el: '#app',
    data: {
      idListaEdit:null,
      novaLista:false,
      descricaoLista: null,
      total:0,
      novoGrupo:false,
      mIndex : null,
      mDescricao:'',
      mUnidade:'',
      mQtd:0.00,
      mPreco:0.00,
      unidades : ["UN", "KG", "LT", "PÇ", "PC"],
      newItem:null,
      clicado:false,
      selecionado:[0,0],
      dados : []
    },
    mounted(){
       this.dados = localStorage.compras ? JSON.parse(localStorage.compras):[] // { "descricao": "Despesa Fev21", "grupos": []}]  
       this.dados.forEach(grupo=>{ 
        grupo.selected = false
     })    
    },
    methods:{
        gravaLocalStorage(){

            // this.dados.forEach(grupo=>{ 
            //    grupo.selected = false
            // })

            localStorage.setItem('compras',JSON.stringify(this.dados))
        },
        cancelarItem(){
            this.novoGrupo = false
            this.newItem = null
            this.mIndex = null
            this.mDescricao = null
            this.mQtd = 0.00
            this.mUnidade = null
            this.mPreco = 0.00
            this.idListaEdit = null
        },
        novoItem(lista,index){

            this.idListaEdit = this.dados.indexOf(lista)

            this.newItem = index
            console.log(lista)
        },
        gravarNovoitem()
        {
            if(this.mIndex === null)
            {
            this.dados[this.idListaEdit].grupos[this.newItem].itens
                .push({ "descricao": this.mDescricao, "qtd": this.mQtd, "unidade": this.mUnidade, "preco": this.mPreco })
            }else{
                this.dados[this.idListaEdit].grupos[this.newItem].itens[this.mIndex].descricao = this.mDescricao
                this.dados[this.idListaEdit].grupos[this.newItem].itens[this.mIndex].qtd =this.mQtd
                this.dados[this.idListaEdit].grupos[this.newItem].itens[this.mIndex].unidade = this.mUnidade
                this.dados[this.idListaEdit].grupos[this.newItem].itens[this.mIndex].preco = this.mPreco
            }

             this.gravaLocalStorage()
             this.cancelarItem()           
        },
        editarItem(idxLista,idxGrupo,item)
        {        
            this.idListaEdit = idxLista
            this.newItem = idxGrupo
            this.mIndex = this.dados[this.idListaEdit].grupos[idxGrupo].itens.indexOf(item)

            this.mDescricao = item.descricao
            this.mQtd = item.qtd
            this.mUnidade = item.unidade
            this.mPreco = item.preco
        },
        gravarNovoGrupo(index){

            this.dados[index].grupos.push({"descricao": this.mDescricao,"selected":false,"itens": [] })
            this.mDescricao = null
            this.dados[index].novoGrupo = false
            this.gravaLocalStorage()
        },
        gravarNovaLista(){
            if(this.novaLista){
                this.dados.push({ "descricao": this.descricaoLista,"novoGrupo":false,"selected":false, "grupos": []})
            }
            
            this.descricaoLista = null
            this.novaLista = false
            this.gravaLocalStorage()
        },
        totalGrupos(dados){
            let total1 = 0

                dados.grupos.forEach(grupos => {
                        total1 += grupos.itens.reduce((soma, iten) => { return soma + (iten.preco * iten.qtd) }, 0)
                })
    
            return total1
        },
        clickGrupo(grupo){




            // this.dados[this.idListaEdit].grupos[this.newItem].itens[this.mIndex].descricao

             grupo.selected = !grupo.selected

             console.log(grupo.selected)

            // // let y = !grupo.selected

            // this.dados.forEach(grupos => {
              
            //     grupos.forEach(itens => {
            //         console.log(itens.selected)
            //     })     
            // })
        },
        botaoExcluirItem(idxLista,idxGrupo,idXItem){

            console.log(idxLista,idxGrupo,idXItem)
            
            this.dados[idxLista].grupos[idxGrupo].itens.splice(idXItem,1)

            console.log(this.dados[idxLista].grupos[idxGrupo].itens[idXItem])

            this.gravaLocalStorage()

        },
        removeGrupo(idxLista,idxGrupo){
            this.dados[idxLista].grupos.splice(idxGrupo,1)
            this.gravaLocalStorage()
        },
        removeLista(idxLista){
            console.log(idxLista)

            this.dados.splice(idxLista,1)
            this.gravaLocalStorage()
        }


    }
}
  )


      //     {
    //         "descricao": "Despesa Fev21",
    //         "grupos": [
    //             {
    //                 "descricao": "Mercearia",
    //                 "selected":false,
    //                 "itens": [
    //                     { "descricao": "Arroz", "qtd": 1, "unidade": "UN", "preco": 3.56 },
    //                     { "descricao": "Feijão", "qtd": 2, "unidade": "UN", "preco": 5.78 },
    //                     { "descricao": "Bolacha", "qtd": 25, "unidade": "UN", "preco": 0.98 }
    //                 ]
    //             },
    //             {
    //                 "descricao": "Feira",
    //                 "selected":false,
    //                 "itens": [
    //                     { "descricao": "Tomate", "qtd": 0.456, "unidade": "KG", "preco": 7.60 },
    //                     { "descricao": "Alho", "qtd": 0.325, "unidade": "KG", "preco": 12.78 },
    //                     { "descricao": "Cenoura", "qtd": 0.658, "unidade": "KG", "preco": 3.50 },
    //                     { "descricao": "Alface", "qtd": 2, "unidade": "UN", "preco": 1.75 }
    //                 ]
    //             },
    //             {
    //                 "descricao": "Limpeza",
    //                 "selected":false,
    //                 "itens": [
    //                     { "descricao": "Detergente", "qtd": 5, "unidade": "UN", "preco": 1.59 },
    //                     { "descricao": "Sabão em Pó", "qtd": 2, "unidade": "UN", "preco": 4.60 },
    //                     { "descricao": "Agua Sanitaria", "qtd": 1, "unidade": "UN", "preco": 2.70 }
    //                 ]
    //             }
    //         ]
    //     }
    // ]