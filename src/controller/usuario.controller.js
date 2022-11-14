export default class Usuario {
    static baseUrl = "https://habits-kenzie.herokuapp.com/api"
    static token = JSON.parse(localStorage.getItem("@kenzie-habits-token"))

    static async login(data) {
        return await fetch(`${this.baseUrl}/userLogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                if (res.token !== undefined) {
                    localStorage.setItem("@kenzie-habits-token", JSON.stringify(res.token))
                    localStorage.setItem("@kenzie-habits-user", JSON.stringify(res.response))
                    window.location = './src/views/homePage.views.html'
                }else{
                    const inputs = document.querySelectorAll("input")
                    inputs.forEach(input => {
                        input.style.border = "1px solid red"
                    })
                    const arrayMsgErro = document.querySelectorAll(".pError")
                    arrayMsgErro.forEach(msgErr => {
                        msgErr.remove()
                    })
                    const formLogin = document.querySelector("#formLogin")
                    const p = document.createElement("p")
                    p.classList.add("pError")

                    p.innerText = res.message
                    p.style.color = "red"
                    p.style.border = "1px solid red"
                    p.style.position = "relative"
                    p.style.left = "0"
                    p.style.top = "-1rem"
                    p.style.borderRadius = "0.3rem"
                    p.style.padding = "0.5rem"
                    p.style.fontWeight = "500"
                    p.style.backgroundColor = "rgba(255, 0, 0, 0.090)"
                    formLogin.insertAdjacentElement("afterbegin" ,p)
                    return res
                }
            })
            .catch(err => console.log(err))


    }

    static async updateUser(data) {
        return await fetch(`${this.baseUrl}/user/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    }

}

// E-mail: grupo3Caique@mail.com
// Senha: 61532680c163157d92f094e6a0d4303f