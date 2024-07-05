import http from 'node:http'

const server = http.createServer((request, response)=>{
    response.end('Hola')
}) 

server.listen(8080, () =>{
    console.log('Server is running on port 8080')
})