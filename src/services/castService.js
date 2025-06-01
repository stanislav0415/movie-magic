import Cast from "../models/Cast.js";

export default {
    getAll(filter) {
        let query = Cast.find();

        if (filter.exclude) {
         
            query = query.nin('_id', filter.exclude);
        }

        return query;
    },
    create(castData) {
        return Cast.create(castData);
    }
};
