const filesys = require('node:fs')

const createReadStream = (filepath) =>{
}

const readStream = filesys.createReadStream('./blog.html')
const writeStream = filesys.createWriteStream('./blog.txt')

// readStream.on('data', (chunk) =>{
//     console.log('_____NEW CHUNK________')
//     writeStream.write('\n____NEW CHUNK____\n')
//     console.log(chunk)
//     writeStream.write(chunk)
// })

// piping
readStream.pipe(writeStream)