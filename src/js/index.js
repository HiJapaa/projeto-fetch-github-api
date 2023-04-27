import { getUser } from './services/user.js'
import { getRepos } from './services/repositories.js'
import { getEvents } from './services/events.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const valorCampo = document.getElementById('input-search').value
    if (validateEmptyInput(valorCampo)) return
    getUserData(valorCampo)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const valorCampo = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13
    if (isEnterKeyPressed) {
        if (validateEmptyInput(valorCampo)) return
        getUserData(valorCampo)
    }
})

function validateEmptyInput (valorCampo){
    if(valorCampo.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepos(userName)
    const eventsResponse = await getEvents(userName)


    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    
    
    screen.renderUser(user)

}