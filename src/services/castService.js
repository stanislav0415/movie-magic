import Cast from '../models/Cast.js';

export default {
    getAll() {
        let query = Cast.find()


        return Cast.find();
    },
    create(castData) {
        return Cast.create(castData);
    }
}