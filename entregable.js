const fs = requiere('fs')

class contenedor{
    constructor(file){
        this.file = file
    }
async save(obj){
    try{
        const objetos = await this.getallobjets()
        const lastId = objects.length > 0 ? objects[objects.length -1].id: 0
        const newId = lastId + 1
        const newObj = {id: newId, ...obj}
        objects.push(newObj) 
        await this.saveObjects(objects)
        return newId

    } catch (error){
        throw new Error ('Error al guardar el objeto')
    }
}

async getById(id){
    try{
        const objects = await this.getallobjets()
        const obj = objects.fin((o)=>o.id == id)
        return obj || null

    }catch(error){
        throw new Error('Error al obtener ID')
    }
}

async getAll(){
    try{
        const objects = await this.getallobjets()
        return objects

    }catch(error){
        throw new Error('Error al obtener los objetos')

    }
}

async deleteById(ID){
    try{
        let objects = await this.getallobjets()
        objects = objects.filter((o)=> o.id !== id)
        await this.saveObjects(objects)

    }catch(error){
        throw new Error ('Error al eliminar los objetos')
    }
}

async deleteAll(){
    try{
   await this.saveObjects([])
    }catch(errror){
      throw new Error('Error al eliminar los objetos')  
    }
}

async getallobjets(){
    try{
    const data = await fs.promises.readfile(this.file, 'utf-8')
    return data ? JSON.parse(data) : []
    }catch(Error){
        return []
    }
}

async saveObjects(objects){
    try{
        await fs.promises.writefile(this.file , JSON.stringify (objects, null , 2))
    }catch(error){
        throw new Error('Error al guardar objetos')
    }
}
}

const main = async()=>{
    const productos = new contenedor('productos.txt')
    //obtener objeto por Id
    const obj = await productos.getById(2)
    console.log ('objeto obtenido', obj)
    
    
    //guardar un objeto
    const id = await productos.save(
        {
      title: 'producto 3',prince :100
        }
    )
    console.log('objeto guardado con Id:', id)

    //obtener todos los objetos
    const allObjects = await productos.getAll()
    console.log('objetos guardados', allObjects )
    //eliminar un objeto
    await productos.deleteById(1)
    console.log('obejto eliminado')
    }

    main().catch((error) => console.error(error))