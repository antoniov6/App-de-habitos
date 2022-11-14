import Habito from "../controller/habits.controller.js"
import Usuario from "../controller/usuario.controller.js"


// "email": "grupo3Caique@mail.com",
// "password": "61532680c163157d92f094e6a0d4303f"

let objs = await Habito.readAll()
function listandoHabitos(obj) {

    obj.forEach(elem => {

        const table = document.querySelector('table')
        const tr = document.createElement("tr")
        const thStatus = document.createElement('th')
        const inputCheck = document.createElement('input')
        const thTitulo = document.createElement('th')
        const thDescricao = document.createElement('th')
        const thCategoria = document.createElement('th')
        const thEditar = document.createElement('th')
        const divCategoriaStyle = document.createElement('div')

        divCategoriaStyle.className = 'divCategoriaStyle'
        inputCheck.type = 'checkbox'
        inputCheck.className = 'check'
        thStatus.className = 'conteudoStatus'
        thTitulo.className = 'conteudoTitulo'
        thDescricao.className = 'conteudoDescricao'
        thCategoria.className = 'conteudoCategoria'
        thEditar.className = 'conteudoEditar'
        tr.className = 'conteudoTabela'

        thTitulo.innerText = elem.habit_title
        thDescricao.innerText = elem.habit_description
        divCategoriaStyle.innerText = elem.habit_category
        thEditar.innerText = '...'
        thEditar.id = elem.habit_id
        inputCheck.id = elem.habit_id
       
        if(elem.habit_status === true) {
            inputCheck.checked = true
            thTitulo.style.textDecoration = 'line-through'
        } 
        

        thCategoria.append(divCategoriaStyle)
        thStatus.appendChild(inputCheck)
        tr.append(thStatus, thTitulo, thDescricao, thCategoria, thEditar)
        table.append(tr)
    })
}
listandoHabitos(objs)



//evento de abrir e fechar modal criar habito
const modal = document.querySelector('#criarHabito')
const buttonCriarModal = document.querySelector('.botaoCriar')
buttonCriarModal.addEventListener('click', () => {
    modal.style.display = 'flex'
})
const buttonFecharModal = document.querySelector('.imageFechar')
buttonFecharModal.addEventListener('click', () => {
    modal.style.display = 'none'
})



//evento de abrir e fechar modal de excluir habito
const modalExcluir = document.querySelector('#modal_excluirHabito')
const buttonExcluirModal = document.querySelector('.botaoExcluir')
buttonExcluirModal.addEventListener('click', (e) => {
    e.preventDefault()
    modalEdit.style.display = 'none'
    modalExcluir.style.display = 'flex'
})
const buttonFecharModalExcluir = document.querySelector('.imageFecharExcluir')
buttonFecharModalExcluir.addEventListener('click', () => {
    modalExcluir.style.display = 'none'
})



// evento para abrir o editar 
const edit = document.querySelectorAll('.conteudoEditar')
const modalEdit = document.querySelector('#modal_editarHabito')
const botaoSalvarAlteracoes = document.querySelector("#botaoSalvarAlteracoes")
const botaoExcluirHabito = document.querySelector("#botaoExcluirHabito")

edit.forEach(elem => {
    elem.addEventListener('click', (event) => {
        modalEdit.style.display = 'flex'
        botaoSalvarAlteracoes.id = event.target.id    
        botaoExcluirHabito.id = event.target.id    
    })
})
const buttonFecharEdit = document.querySelector(".imageFecharEdit")
buttonFecharEdit.addEventListener('click', () => {
    modalEdit.style.display = 'none'
})



// Evento editar habito
botaoSalvarAlteracoes.addEventListener("click", (event) => {
    event.preventDefault()
    const formElements = [...event.target.parentNode.parentNode]
    const data = {}
    formElements.forEach(elem => {
        if(elem.name !== "" && elem.value !== "" && elem.name !== "habit_status"){
            data[elem.name] = elem.value
        }
    })
    console.log(data)
    const idHabito = botaoSalvarAlteracoes.id
    Habito.updateHabit(data, idHabito)
    setTimeout(() => {
        window.location.reload(true)
    }, 1000)
})




//Evento excluir habito

botaoExcluirHabito.addEventListener("click", (event) => {
    event.preventDefault()
    const idHabito = event.target.id
    Habito.deleteHabit(idHabito)
    setTimeout(() => {
        window.location.reload(true)
    },1000)
})



//Evento cancelar excluir habito
const botaoCancelarExcluirHabito = document.querySelector("#botaoCancelar_excluirHabito")

botaoCancelarExcluirHabito.addEventListener("click", () => {
    modalExcluir.style.display = "none"
})




// evento button logout 
const buttonLogout = document.querySelector('.linkLogout')
buttonLogout.addEventListener('click', () => {
    localStorage.removeItem("@kenzie-habits-token")
    localStorage.removeItem("@kenzie-habits-user")
    window.location = '../../index.html'
})



//função de dados do user 
let usuario = JSON.parse(localStorage.getItem('@kenzie-habits-user'))
function elementosDom(data) {
    const boxUser = document.querySelector(".segundoBox")
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const h3 = document.createElement("h3")

    h3.innerText = data.usr_name
    img.src = data.usr_image

    figure.append(img)
    boxUser.append(figure, h3)

    const figureBoxMenor = document.querySelector(".figureUser")
    const imgMenorBox = document.createElement('img')
    imgMenorBox.src = data.usr_image
    figureBoxMenor.append(imgMenorBox)
}
elementosDom(usuario)



//criar habito
const buttonCriandoHabito = document.querySelector('.botaoAzulEscuro')
buttonCriandoHabito.addEventListener('click', () => {
    const titulo = document.querySelector('.inputTitulo').value.trim()
    const descricao = document.querySelector(".areadescricao").value
    const select = document.querySelector('.areacategoria').value

    let habito = {
        habit_title: titulo,
        habit_description: descricao,
        habit_category: select
    }
    Habito.createHabit(habito)
    setTimeout(() => {
        window.location.reload(true)
    }, 1000)
})



//evento para abrir e fechar Editar usuario
const editarUsuario = document.querySelector(".linkEditar")
const modalEditarUsuario = document.querySelector("#modal_editarUsuario")
const buttonFecharEditarUsuario = document.querySelector("#buttonFecharEditarUsuario")
editarUsuario.addEventListener("click", () => {
    modalEditarUsuario.style.display = "flex"
})
buttonFecharEditarUsuario.addEventListener("click", () => {
    modalEditarUsuario.style.display = "none"
})

//evento editar usuario
const botaoInserir = document.querySelector("#botaoInserir")
botaoInserir.addEventListener("click", async (event) => {
    event.preventDefault()
    const formEditarUsuario = [...event.target.parentNode]
    const data = {}
    formEditarUsuario.forEach(elem => {
        if(elem.name !== "" && elem.value !== ""){
            data[elem.name] = elem.value
        }
    })
    const usuarioEditado = await Usuario.updateUser(data)
    console.log(usuarioEditado)
    const {usr_name, usr_email, usr_image} = usuarioEditado
    const atualizarLocalStorage = {
        usr_name: usr_name,
        usr_email: usr_email,
        usr_image: usr_image
    }
    localStorage.setItem("@kenzie-habits-user", JSON.stringify(atualizarLocalStorage))
    window.location.reload(true)
})




const check = document.querySelectorAll('.check')
check.forEach(elem => {
    elem.addEventListener('click',  () => {
           Habito.completeHabit(elem.id)
           setTimeout(() => {
            window.location.reload(true)
           }, 1000)
    })
})




const botaoTodos = document.querySelector(".botaoTodos")
const botaoConcluido = document.querySelector(".botaoConcluidos")

botaoTodos.addEventListener("click", () => {
    const table = document.querySelector('table')
    const trs = document.querySelectorAll(".conteudoTabela")
    trs.forEach(tr => {
        tr.remove()
    })
    listandoHabitos(objs)
})

botaoConcluido.addEventListener("click", () => {
    const statusTrue = objs.filter(obj => {
        return obj.habit_status === true        
    })
    const trs = document.querySelectorAll(".conteudoTabela")
    trs.forEach(tr => {
        tr.remove()
    })
    listandoHabitos(statusTrue)
})
