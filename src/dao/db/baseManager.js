
// Clase base para los managers de las colecciones de la base de datos
class BaseManager {
    
    constructor(model)  {
        this.model = model;
    }

    // Metodo de busqueda de todos los elementos de una coleccion con paginacion
    // Recibe un objeto con las opciones de paginacion

    // Metodo abstracto ya que difiere la ruta en los nextPage y prevPage
    async findAll(opts){
       throw new Error('Metodo no implementado, lo deben implementar las clases hijas');
    }

    // Metodo de busqueda de un elemento por id
    async findById(id){
        return await this.model.findById(id);
    }

    // Metodo para crear un elemento
    async createOne(data){
        return await this.model.create(data);
    }

    // Metodo para actualizar un elemento
    async updateOne(id, data){
        return await this.model.findOneAndUpdate({ _id: id }, data);
    }

    // Metodo para eliminar un elemento
    async deleteOne(id){
        return await this.model.deleteOne({ _id: id })
    }
    
}

export default BaseManager;