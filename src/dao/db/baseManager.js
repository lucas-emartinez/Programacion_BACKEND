class BaseManager {
    
    constructor(model)  {
        this.model = model;
    }

    async findAll(){
        return this.model.find();
    }

    async findById(id){
        return this.model.findById(id);
    }

    async createOne(data){
        return this.model.create(data);
    }

    async updateOne(id, data){
        return this.model.updateOne({ _id: id }, data);
    }

    async deleteOne(id){
        return this.model.deleteOne({ _id: id })
    }
    
}

export default BaseManager;