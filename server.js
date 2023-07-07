const http = require('node:http')
const filesystem = require('node:fs')


const server = http.createServer((request, response)=>{
    response.writeHead(200,{'Content-Type': 'text/html'})
    filesystem.readFile('./views/index.html', 
        (err, content) =>{
            if(err) throw err

            // response.write(content)
            response.end(content)
        }
    )
})

const PORT = process.env.PORT || 5600

server.listen(PORT, 'localhost' , () =>{
    console.log(`Server running aT: http: //localhost:${PORT}`)
})