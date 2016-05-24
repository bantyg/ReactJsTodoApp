var Task = React.createClass({displayName: "Task",
    render: function () {
        var taskStyle = {
            "height":"28px",
            "width":"70%",
            "borderBottom":"solid gray 1px",
            "borderRadius":"5px",
            "marginTop":"5px"
        };
        var index = this.props.index;
        var trashStyle = {"float":"right",marginRight:"10px"};
        return (React.createElement("div", {style: taskStyle}, 
            React.createElement("span", null, this.props.index+1, ". ", this.props.task, " "), 
            React.createElement("a", {href: "#", style: trashStyle, onClick: this.props.deleteTask(index)}, "Delete")
        ));
    }
});

var TodoList = React.createClass({displayName: "TodoList",
    getInitialState: function () {
        return {tasks:this.props.tasks};
    },

    deleteTask: function (index) {
        return function (e) {
            this.state.tasks.splice(index,1);
            this.setState(this.state.tasks);
        }.bind(this);
    },

    render: function () {
        return (React.createElement("div", null, 
            React.createElement("br", null), 
            React.createElement("br", null), 
            this.props.tasks.map(function (task, index) {
                return (React.createElement(Task, {task: task, index: index, key: index, deleteTask: this.deleteTask}))
            }.bind(this))
        ))
    }
});

var TodoApp = React.createClass({displayName: "TodoApp",
    getInitialState: function () {
        return {tasks:[],newTask:""}
    },

    changeTodoTask: function (e) {
        this.setState({newTask:e.target.value})
    },

    getNextId : function () {
        return (this.state.tasks.length == 0) ? 1 : _.last(this.state.tasks).id+1;
    },

    onEnter: function (e) {
        if(e.charCode == 13){
            var tasks = this.state.tasks
            tasks.push(this.state.newTask);
            this.setState({tasks:tasks, newTask:""})
            console.log(this.state)
        }
    },

    render: function () {
        var style = {width: "70%"}
        return (React.createElement("div", null, 
            React.createElement("h1", null, " TODO "), 
            React.createElement("input", {className: "form-control input-lg", style: style, placeholder: "Enter task here..", value: this.state.newTask, onChange: this.changeTodoTask, onKeyPress: this.onEnter}), 
            React.createElement(TodoList, {tasks: this.state.tasks})
        ))
    }
})


ReactDOM.render(React.createElement(TodoApp),document.getElementById("app"));
