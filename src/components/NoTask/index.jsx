import './styles.css'
export const NoTasks = () => {
    const noTask = require('../../assets/tasks.png');


  return (
    <div className="no_task_wrapper">
        <div className='no_task'>
            <img src={noTask} alt="no task"  />
            <p>
                No Task
            </p>
        </div>
    </div>
  )
}
