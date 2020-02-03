const ToDo = require('../domain/toDo');
const log4js = require('log4js');
const logger = log4js.getLogger('todo-controller');

// Page-Controller mit Handler Methoden

exports.getAllTodos = (req, res) => {

    ToDo.find((err, todos) => {
        if (err) {
            logger.error(`GET Request failed: ${err}`);
            res.status(404).send(err);
        }
        logger.debug(`GET Request successful: Found ${todos.length} Todo's`);
        res.status(200).json(todos);
    })
};

exports.addNewTodo = (req, res) => {

    let newTodo = new ToDo();
    newTodo.title = req.body.title;
    newTodo.description = req.body.description;

    newTodo.save((err, todo) => {
        if (err) {
            logger.error(`POST Request failed: ${err}`);
            res.status(400).send(err);
        }
        logger.debug(`POST Request successful: added new Todo`);
        res.status(200).json(todo);
    });
};

exports.updateTodo = (req, res) => {

    ToDo.findByIdAndUpdate(req.params.id, req.body,
        { new: true, useFindAndModify: false, runValidators: true },
        (err, updatedToDo) => {

        if (err.name == "ValidationError") {
            logger.error(`PUT Request failed: ${err}`);
            res.status(412).send(err);
        }
        else if(err){
            logger.error(`PUT Request failed: ${err}`);
            res.status(404).send(err);
        }
        logger.debug(`PUT Request successful: updated ToDo with id: ${req.params.id}`);
        res.status(200).json(updatedToDo);
    });
};

exports.deleteTodo = (req, res) => {

    ToDo.findByIdAndDelete(req.params.id, (err, todo) => {

        if (err) {
            logger.error(`DELETE Request failed: ${err}`);
            res.status(404).send(err);
        }
        logger.debug(`DELETE Request successful: deleted Todo with id: ${req.params.id}`);
        res.status(200).send('Todo successfully deleted');
    });
};

