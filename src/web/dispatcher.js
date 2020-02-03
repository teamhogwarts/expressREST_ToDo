const pageController = require('../controller/toDo-controller');
const express = require('express');
const { getAllTodos,
    addNewTodo,
    updateTodo,
    deleteTodo,
} = pageController;


// Front Controller
const dispatcher = express.Router();

// add all routes here
// Page-Controller mapping

dispatcher.route('/todos')
    .get(getAllTodos)
    .post(addNewTodo);

dispatcher.route('/todos/:id')
    .put(updateTodo)
    .delete(deleteTodo);

// export dispatcher to be able to use it outside of this module
module.exports = dispatcher;