export default class Habito {
    static baseUrl = "https://habits-kenzie.herokuapp.com/api"
    static token = JSON.parse(localStorage.getItem("@kenzie-habits-token"))

    static async createHabit(data) {
        return await fetch(`${this.baseUrl}/habits`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }

    static async readAll() {
        return await fetch(`${this.baseUrl}/habits`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

    }

    static async readByCategory(categoria) {

        return await fetch(`${this.baseUrl}/habits/category/${categoria}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))

    }
    static async updateHabit(data, id) {
        return await fetch(`${this.baseUrl}/habits/${id}`, {
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
    static async completeHabit(id) {
        return await fetch(`${this.baseUrl}/habits/complete/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }
    static async deleteHabit(id) {
        return await fetch(`${this.baseUrl}/habits/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(res => res.json())
            .then(res => res)
            .catch(err => console.log(err))
    }
}