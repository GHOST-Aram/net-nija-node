const http = require('node:http')
const filesystem = require('node:fs')
const PORT = process.env.PORT || 5600

const server = http.createServer(
    (request, response)=>{
        if(request.url === '/about-me'){
            redirect(response, '/about')
            
        } else {
            const filePath = getFilePath(request.url)
            const statusCode = getStatusCode(filePath)
    
            response.writeHead(statusCode,{'Content-Type': 'text/html'})
            render(response, filePath)
        }
    }
)

server.listen(PORT, 'localhost' , () =>{
    console.log(`Server running aT: http: //localhost:${PORT}`)
})

const getFilePath = (url) =>{
    const basepath = './views/'
    switch(url){
        case '/': 
            return basepath+'index.html'
        case '/about': 
            return basepath+'about.html'
        default: 
            return basepath+'404.html'
    }
}
const getStatusCode = (filePath) =>{
    if(filePath.includes('404.html'))
        return 404
    return 200
}

const render = (response, filePath) =>{
    filesystem.readFile(filePath, 
        (err, content) =>{
            if(err) throw err
            response.end(content)
        }
    )
}

const redirect = (response, to) =>{
    response.setHeader('Location', to)
}
