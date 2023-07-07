const {people, ages} = require('./people')


console.log(people, ages)
const os = require('os')
console.log('Platform, ', os.platform(), os.homedir())

const filesys = require('fs')
const { dirname } = require('path')
filesys.readFile('./people.js', (err, data)=>{
    if (err) throw err
    console.log(data.toString())
})

const makedirectory = (dirname) =>{
    filesys.mkdir(dirname, (err) =>{
        if(err) throw err
        console.log('Folder created')
    })
}

const removeDirectory = (dirname) =>{
    filesys.rmdir(dirname, (err) =>{
        if(err) throw err
        console.log('Folder deleted')
    })
}

const deleteFile = (filepath) =>{
    filesys.unlink(filepath, (err) =>{
        if(err) throw err
        console.log('File deleted')
    })
}

if(!filesys.existsSync('./blog'))
    makedirectory('./blog')
else
    removeDirectory('./blog')

    
    
    filesys.writeFile('./blog.txt', 'Hello world',(err) =>{
        if(err) throw err
        console.log('File was written')
    })
    
    if(filesys.existsSync('./blog.txt'))
        deleteFile('./blog.txt')

console.log('Last line')