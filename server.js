const http = require('node:http')
const filesystem = require('node:fs')


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

const render = (response, filePath) =>{
    filesystem.readFile(filePath, 
        (err, content) =>{
            if(err) throw err
            response.end(content)
        }
    )
}

const server = http.createServer((request, response)=>{
    response.writeHead(200,{'Content-Type': 'text/html'})
    const filePath = getFilePath(request.url)
    render(response, filePath)
})

const PORT = process.env.PORT || 5600

server.listen(PORT, 'localhost' , () =>{
    console.log(`Server running aT: http: //localhost:${PORT}`)
})