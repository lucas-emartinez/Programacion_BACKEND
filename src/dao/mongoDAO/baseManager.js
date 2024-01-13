// Clase base para los managers de las colecciones de la base de datos
class BaseManager {
    constructor(model, populateOption)  {
        this.model = model;
        this.populateOption = populateOption;
    }

    // Metodo abstracto
    async findAll(){
        try {
            const result = await this.model.find().populate(this.populateOption);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Metodo de busqueda de un elemento por id
    async findById(id){
        try {
            const result = await this.model.findById(id).populate(this.populateOption);
            if (!result) throw new Error(`No existe un elemento con el id ${id}`);    
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Metodo para crear un elemento
    async createOne(data){
        try {
            const newObj = await this.model.create(data);
            if (!newObj) throw new Error(`Error al crear el elemento`);
            return newObj;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Metodo para actualizar un elemento
    async updateOne(id, data){
        try {
            const updatedObj = await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
            if (!updatedObj) throw new Error(`No existe un elemento con el id ${id}`);
            return updatedObj;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Metodo para eliminar un elemento
    async deleteOne(id){
        try {
            const deletedObj = await this.model.findOneAndDelete({ _id: id });
            if (!deletedObj) throw new Error(`No existe un elemento con el id ${id}`);
            return deletedObj;
        } catch (error) {
            throw new Error(error);
        }
    }
    
}

export default BaseManager;