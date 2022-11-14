import Usuario from "../controller/usuario.controller.js"

const buttonLogin = document.querySelector("button")
buttonLogin.addEventListener('click', () => {
    const inputEmail = document.querySelector('.email')
    const inputSenha = document.querySelector('.senha')


    let obj = {
        email: inputEmail.value,
        password: inputSenha.value
    }
    Usuario.login(obj)
})