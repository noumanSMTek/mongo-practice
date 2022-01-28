//Import the mongoose module
var mongoose = require('mongoose');

//Import the mongoose module
mongoose.connect('mongodb://127.0.0.1:27017/myDB')
    .then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.log(err);
    });

// Creating Schema
const usersSchema = new mongoose.Schema({
    fName: {
        type: String,
    },
    lName: {
        type: String,
    },
    contact: {
        type: Number,
        unique: true,
        dropDups: true,
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 18) {
                throw new Error('You should must be 18 or older')
            }
        }
    },
    accountCreated: {
        type: Date,
        default: Date.now
    }
});

// Creating Collection
const User = new mongoose.model('User', usersSchema);



// Inserting Document
// const createDocument = async() => {
//     try {
//         const firstUser = new User({
//             fName: 'Nouman',
//             lName: 'Fatta',
//             contact: 3032167639,
//         })
//         const result = await firstUser.save();
//         console.log(result);
//     } catch (err) {
//         console.log(err);
//     }
// }

// Inserting Multiple Documents
const createDocument = async() => {
    try {
        const firstUser = new User({
            fName: 'Nouman',
            lName: 'Fatta',
            contact: 3032167639,
            age: 21,
        })
        const secondUser = new User({
            fName: 'Adbullah',
            lName: 'Motiwala',
            contact: 3170268439,
            age: 19
        })
        const thirdUser = new User({
            fName: 'Usman',
            lName: 'Ashraf',
            contact: 3070204027,
            age: 20,
        })
        const result = await User.insertMany([firstUser])
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

// createDocument();

// Reading Document
// const readDocument = async() => {
//     try {
//         const result = await User.find({ number: 3032167639 })
//             .select({ fName: 1, lName: 1 })
//             .limit(1);
//         console.log(result);
//     } catch (err) {
//         console.log(err);
//     }
// }


//  Conditional Reading Documents
const readDocument = async() => {
        try {
            // const result = await User.find({ age: { $in: [20, 21] } })
            // const result = await User.find({ age: { $not: { $eq: 20 } } })
            // const result = await User.find({ $nor: [{ age: 21 }, { fName: 'Nouman' }] })
            //     .select({ fName: 1, _id: 0, lName: 1 })
            //     .countDocuments()
            const result = await User.find()
                .select({ _id: 0, fName: 1 })
                .sort({ fName: -1 })
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }
    // readDocument();


// Updating Document
const updateDocument = async() => {
    try {
        // Update Data Without Getting Data
        // const result = await User.findByIdAndUpdate({ _id: '61f3c267acd478d939ef0f96' }, {


        // FIND DATA THAT IS BEING UPDATED
        const result = await User.findByIdAndUpdate({ _id: '61f3c267acd478d939ef0f96' }, {
            $set: {
                contact: 3170268439
            }
        }, {
            new: true,
            useFindAndModify: false
        })
        console.log(result);
    } catch (err) { console.log(err); }
}

// updateDocument();



const deleteDocument = async(_id) => {
    try {
        const result = await User.findByIdAndDelete({ _id });
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

// deleteDocument('61f3d02502108cc44e435d77');