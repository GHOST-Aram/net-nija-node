const http = require('node:http')
const PORT = process.env.PORT || 5600
const Server = require('./server-class')
const webServer = new Server()


const server = http.createServer((request, response)=>{
    if(request.url === '/about-me'){
        webServer.redirect(response, '/about')
    } else {
        const filePath = webServer.getFilePath(request.url)
        webServer.render(response, filePath)
    }
})

server.listen(PORT, 'localhost' , () =>{
    console.log(`Server running aT: http://localhost:${PORT}`)
})


