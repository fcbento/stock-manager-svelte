const setUserToken = (authorization) => {
    localStorage.setItem('token', JSON.stringify(authorization));
}

const setUserInfo = (info) => {
    localStorage.setItem('userData', JSON.stringify(info));
}

const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('userData')) || 'User not found';
}

export { setUserToken, setUserInfo, getUserInfo }