const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const Group = require('./models/group')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// get users
app.get('/scim/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// get user by id
app.get('/scim/users/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// post users
app.post('/scim/users', async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a user
app.put('/scim/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        // we cannot find any user in database
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a user
app.delete('/scim/users/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        res.status(200).json({message: "Successfully deleted"});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get groups
app.get('/scim/groups', async(req, res) => {
    try {
        const groups = await Group.find({});
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get groups by id
app.get('/scim/groups/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const group = await Group.findById(id);
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// post a group
app.post('/scim/groups', async(req, res) => {
    try {
        const group = await Group.create(req.body)
        res.status(200).json(group);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a group
app.put('/scim/groups/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const group = await Group.findByIdAndUpdate(id, req.body);
        // we cannot find any group in database
        if(!group){
            return res.status(404).json({message: `cannot find any group with ID ${id}`})
        }
        const updatedGroup = await Group.findById(id);
        res.status(200).json(updatedGroup);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a group
app.delete('/scim/groups/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const group = await Group.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `cannot find any group with ID ${id}`})
        }
        res.status(200).json({message: "Successfully deleted"});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Create a new user and add them to a group
app.post('/scim/users/:id/groups/:groupId', async (req, res) => {
    try {
      const { id, groupId } = req.params;

      const user = await User.findByIdAndUpdate(
        id,
        { $push: { groups: groupId } },
        { new: true }
      ).exec();
      const group = await Group.findByIdAndUpdate(
        groupId,
        { $push: { users: id } },
        { new: true }
      ).exec();
      res.json(user);
    } catch (error) {
      console.error('Error adding user to group:', error);
      res.status(500).json({ error: 'Failed to add user to group' });
    }
  });


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://kingoricecily100:zm0w8zX12lqfYEEK@cluster0.yydq50u.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(8080, ()=> {
        console.log(`Node API app is running on port 8080`)
    });
}).catch((error) => {
    console.log(error)
})