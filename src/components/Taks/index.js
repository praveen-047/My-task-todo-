import { Component } from "react"
import { v4 as uuidv4 } from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]



class Task extends Component {

  state = { taskList: [], taskInput: '', tagInput: tagsList[0].displayText, selectedTag: '', }


  onChangeTask = (event) => {
    this.setState({ taskInput: event.target.value })
  }

  onChangeTag = (event) => {
    this.setState({ tagInput: event.target.value })
  }

  onClickAddTask = () => {
    const { taskInput, tagInput } = this.state;
    if (!taskInput || !tagInput) return;
    const newTask = {
      id: uuidv4(),
      taskInput,
      tagInput
    };
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      taskInput: '',
      tagInput: tagsList[0].displayText,
    }));
  }

  onClickTag = tag => {
    this.setState(prevState => ({
      selectedTag: prevState.selectedTag === tag ? '' : tag,
    }))
  }


  renderLeftContainer = () => {
    const { taskInput, tagInput } = this.state
    return (
      <>
        <h1 className="create-task-heading">Create a task!</h1>
        <div className="label-input-container">
          <label htmlFor="task" className="label">Task</label>
          <div className="input-container">
            <input type='text' id='task' className="input" placeholder="Enter the task here" value={taskInput} onChange={this.onChangeTask} />
          </div>

          <label htmlFor='tags' className="label">Tags</label>
          <select id='tags' className="select" value={tagInput} onChange={this.onChangeTag}>
            {tagsList.map(tag => (
              <option key={tag.optionId} value={tag.displayText}>{tag.displayText}</option>
            ))}
          </select>

          <button type='button' className="add-task-btn" onClick={this.onClickAddTask}>Add Task</button>
        </div>
      </>
    )
  }

  renderRightContainer = () => {
    const { taskList, selectedTag } = this.state

    const filteredTasks = selectedTag === "" ? taskList : taskList.filter(task => task.tagInput === selectedTag)
    return (
      <>
        <h1 className="tags-heading">Tags</h1>
        <ul className="tags-container-ul">
          {tagsList.map(each => {
            const isActive = each.displayText === selectedTag
            const tagClassName = isActive ? 'li-list active-tag' : 'li-list'

            return (
              <li
                className={tagClassName}
                key={each.optionId}
                onClick={() => this.onClickTag(each.displayText)}
              >
                {each.displayText}
              </li>
            )
          })}
        </ul>
        <h1 className="tasks-heading">Tasks</h1>
        {filteredTasks.length === 0 ? (
          <div className="no-task-container">
            <p className="no-tasks-text">No Tasks Added Yet</p>
          </div>
        ) : (
          <ul className="task-ul">
            {filteredTasks.map(each => (
              <li className="task-li" key={each.id}>
                <div className="task-li-container">
                  <p>{each.taskInput}</p>
                  <div>
                    <p>{each.tagInput}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  render() {
    const { taskList } = this.state
    return (
      <div className="main-container">
        <div className="left-container">
          {this.renderLeftContainer()}
        </div>
        <div className="right-container">
          {this.renderRightContainer()}
        </div>
      </div>
    )
  }
}

export default Task