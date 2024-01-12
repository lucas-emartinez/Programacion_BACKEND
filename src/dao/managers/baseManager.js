
// Clase base para los managers de las colecciones de la base de datos
class BaseManager {
    
    constructor(model, populateOption)  {
        this.model = model;
        this.populateOption = populateOption;
    }

    // Metodo abstracto
    async findAll(){
       throw new Error('Metodo no implementado, lo deben implementar las clases hijas');
    }

    // Metodo de busqueda de un elemento por id
    async findById(id){
        const result = await this.model.findById(id).populate(this.populateOption);
        if (!result) throw new Error(`No existe un elemento con el id ${id}`);
        return result
    }

    // Metodo para crear un elemento
    async createOne(data){
        const newObj = await this.model.create(data);
        if (!newObj) throw new Error(`Error al crear el elemento`);
        return newObj;
    }

    // Metodo para actualizar un elemento
    async updateOne(id, data){
        const updatedObj = await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!updatedObj) throw new Error(`No existe un elemento con el id ${id}`);
        return updatedObj;
    }

    // Metodo para eliminar un elemento
    async deleteOne(id){
        const deletedObj = await this.model.findOneAndDelete({ _id: id });
        if (!deletedObj) throw new Error(`No existe un elemento con el id ${id}`);
        return deletedObj;
    }
    
}

export default BaseManager;