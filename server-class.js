const filesystem = require('node:fs')
const path =require('node:path')

class Server{
    #getContentType = (extname) =>{
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

    getFilePath = (url) =>{
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

    #getStatusCode = (filePath) =>{
        if(filePath.includes('404.html'))
        return 404
        return 200
    }

    render = (response, filePath) =>{
        const statusCode = this.#getStatusCode(filePath)
        const contentType = this.#getContentType(path.extname(filePath))

        response.writeHead(statusCode,{'Content-Type': contentType})
        filesystem.readFile(filePath, (err, content) =>{
            if(err) throw err
            response.end(content)
        })
    }

    redirect = (response, to) =>{
        response.setHeader('Location', to)
    }
}

module.exports = Server