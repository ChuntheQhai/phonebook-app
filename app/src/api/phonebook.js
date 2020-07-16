

export const createPhoneBookAPI = (phonebook) => {
    return fetch(`${process.env.REACT_APP_API_URL}/phonebook`, { 
        method: 'POST', 
        body: JSON.stringify(phonebook),  
        headers: { 'Content-Type': 'application/json' } 
    })
        .then(res => res.json()) // expecting a json response
        .then(json => Promise.resolve(json));
}

export const getPhoneBookAPI = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/phonebooks`, { method: 'GET' })
        .then(res => res.json()) // expecting a json response
        .then(json => Promise.resolve(json));
}

export const deletePhoneBookAPI = (id) => {
    return fetch(`${process.env.REACT_APP_API_URL}/phonebook/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' } 
    })
        .then(res => res.json()) // expecting a json response
        .then(json => Promise.resolve(json));
}