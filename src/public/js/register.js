const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const enviarButton = document.querySelector('#enviar');


const user = {
    name: '',
    email: '',
    password: ''
}

const handleChange = (e) => {
    const {name, value} = e.target
    user[name] = value
    console.log(user[name])
}

nameInput.addEventListener('input',handleChange)

emailInput.addEventListener('input',handleChange)

passwordInput.addEventListener('input',handleChange)

enviarButton.addEventListener('click', () => {
    fetch('http://localhost:8080/api/user',{
        method: 'POST',
        body: JSON.stringify(user)

    })
    .then(res => res.json())
    .then(result => console.log(result))
})
