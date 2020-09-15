import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'HELLO97978684',
      database : 'smart_brain'
    }
  });




// console.log(result);

const app = express();
app.use(express.json());
app.use(cors());


// const database = {
//     users:[
//         {
//             id:'123',
//             name:'khalid',
//             email:'khalid@gmail.com',
//             password:'football',
//             entries:0,
//             joined:new Date()
//         },

//         {
//             id:'124',
//             name:'yousef',
//             email:'yousef@gmail.com',
//             password:'volly',
//             entries:2,
//             joined:new Date()
//         }
//     ]
// }


app.get('/', (req, res) => {
    res.json(database.users);
})


app.post('/signin', (req, res) => {
    // console.log(req.body);
    const {email, password} = req.body;
    // console.log(email.includes('@'));

    if (email.includes('@')){

            db('login').select('email', 'hash').where('email','=',email)
            .then(data => {
            console.log(data);
            const inValid = bcrypt.compareSync(password, data[0].hash);
            console.log(inValid);

            if (inValid) {
                return db('users').select('*')
                .where('email','=',email)
            }
            else{
                res.status(400).json('password is not correct');
            }
        
            })
            .catch(err => res.status(400).json('email is not found'))
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(400).json('error at the end',err))
    }
    else {
        res.json('please enter an email');
    }

    
    
})



app.post('/register', (req, res) => {
    const { name, email, password} = req.body;
    console.log(password);
    if (email.includes('@') && email.length>=11 && name.length >=1 && password.length >=1){

        const hash = bcrypt.hashSync(password, 10);
        db.transaction(trx => {
            return trx('login').insert({
            email:email, 
            hash:hash
        })
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name:name,
                email:loginEmail[0],
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.json('error in getting the user'))
            
        })
    })
    
    
            .catch(err => res.status(400).json('email is already exist'));
    }

    else {
        if(!password) res.json('please enter a password');
        else{
            res.json('please enter an email')
        }
    }
    

})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db('users').where('id',id)
    .returning('*')
    .then(user => {
        if (user.length){
            res.json(user[0]);
        }
        else {
            res.status(400).json('unable to get the user');
        }
    })
})



app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users')
   .where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
       console.log(entries[0]);
       res.json(entries[0]);
   })
   .catch(err => res.status(400).json('unable to get count'));
})



app.listen(3001, () => {
    console.log('app is running');
});
/*
1-/sign in 
2-/ register -> set and get user
3-/profile:userId --> get user
4-/image -> put -> user
*/