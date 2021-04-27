export const headers =  {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    "Authorization" : JSON.parse(localStorage.getItem("token"))
}

export const url = 'http://localhost:8080/api'
export const loginUrl = 'http://localhost:8080'