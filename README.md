1. movie : { 50 field}
2. customer : { 50 field}

--> now we want to create rental schema but don't need all field of customer and movie
--> we need only 3-4 field from customer and movie

const Rental = mongoose.model("Rental", new mongoose.Schema({

    cutomer : {
        type : new mongoose.Schema({
                name : String,
                phone: String
            })
        required :true
    },

    movie :
    {
        type: new mongoose.Schema({
            title : String,
            rant: String
        }),
        required : true
    },

    dateOut :
    {
        type : Date,
        required: true,
        default : Date.now
    },

    dateReturn :
    {
        type: Date
    },

    rentalFee:
    {
        type : Number,
        min : 0
    }

}))

//Fawn used when we want all transaction to happen or no transaction to happen
