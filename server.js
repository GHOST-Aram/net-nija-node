const http = require('node:http')
const filesystem = require('node:fs')
const path =require('node:path')
const PORT = process.env.PORT || 5600

const server = http.createServer((request, response)=>{
    if(request.url === '/about-me'){
        redirect(response, '/about')
    } else {
        const filePath = getFilePath(request.url)
        render(response, filePath)
    }
})

server.listen(PORT, 'localhost' , () =>{
    console.log(`Server running aT: http://localhost:${PORT}`)
})

const getContentType = (extname) =>{
    switch(extname){
        case '.html':
            return 'text/html'
        case '.js':
            return 'text/js'
        case '.json':
            return 'application/json'
        case '.css':
            return 'text/css'
        default:
            break
    }
}

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
    const statusCode = getStatusCode(filePath)
    const contentType = getContentType(path.extname(filePath))

    response.writeHead(statusCode,{'Content-Type': contentType})
    filesystem.readFile(filePath, (err, content) =>{
        if(err) throw err
        response.end(content)
    })
}

const redirect = (response, to) =>{
    response.setHeader('Location', to)
}
