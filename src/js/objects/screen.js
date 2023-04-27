const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto de perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 🤷‍♂️'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😒'}</p><br>
                                            <p>👻 <span class='bold'>${user.followers}</span> followers · <span class='bold'>${user.following}</span> following</p>
                                        </div>
                                      </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ''
        user.events.forEach((event) => {

            if (event.type == "CreateEvent" || event.type == "PushEvent") {
                if (event.payload.commits == undefined) {
                    eventsItens += `<li><span class="repoEvent">${event.repo.name}</span> - <span class="eventUpdate">Não possui Commit</span></li>`
                }
                else {
                    eventsItens += `<li><span class="repoEvent">${event.repo.name}</span> - <span class="eventUpdate">${event.payload.commits[0].message}</span></li>`
                }
            }
        })


        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class='events section'>
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        }

    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }