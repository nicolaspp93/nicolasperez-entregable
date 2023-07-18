const objetos = [
    {
        manzana:3,
        peras:2,
        carne:1,
        jugos:5,
        dulces:2,
    },
     {
        manzanas:1,
        sandias:1,
        huevos:1,
        jugos:1,
        panes:4,
    }
]
//obtener lista de tipos de productos

const tiposProductos = objetos.reduce((lista,objeto)=>{
    Object.keys(objeto).forEach(producto=>{
        if(!lista.includes(producto)){
            lista.push(producto)
        }
    })
    return lista
}, [] )

console.log("tipos de productos:", tiposProductos)

//obtener total de productos vendidos

const totalProductosVendidos = objetos.reduce((total,objeto)=>{
    const cantidades = Object.values(objeto)
    const suma = cantidades.reduce((a,b)=> a+b,0)
    return total + suma 

}, 0)

console.log("total productos vendidos", totalProductosVendidos)

 