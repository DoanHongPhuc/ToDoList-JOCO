import { useDrop } from "react-dnd"
import TodayTask from "../../components/Task/Today_Task/TodayTask";
import MovableItem from "../../components/DragAndDrop/MovableItem";
import AddTask from "../../components/Task/Add_Task/Add_Task";
import { useEffect, useState } from "react";
function TaskColumn(props:any){
  const colData = props.colData
  const [due_date,setDueDate] = useState<string>(props.colData.due_date)
  useEffect(() => {
    setDueDate(props.colData.due_date)
  }, [colData]);
  let [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'movable_item',
    drop: () => ({ due_date:  due_date}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }),[due_date])

  
  return (
    <div ref={drop}>
      <div className="upcoming_body_item h-full">
          <div className="upcoming_item_header h-11 flex items-center">
              <p className="text-sm font-semibold leading-12">{colData.headerColTilte}</p>
          </div>
          <div className="upcoming_item_body space-y-3">
            {
              isOver && <div className="upcoming_task_boxshadow h-16 w-full rounded-lg bg-gray-300/[0.4]"></div>
            }
              {
                  colData.taskList.map((task:any)=>{
                      return(
                          <MovableItem task = {task} handleEditTask = {props.handleEditTask}>
                              <TodayTask
                              key={task.id}
                              task={task}
                              handleEditTask={props.handleEditTask}
                              handleTaskComplete={props.handleTaskComplete}
                              />  
                          </MovableItem>
                          )
                      })
                  }
              <div className="upcoming_add_task">
                  <AddTask
                      handleAddTask={props.handleAddTask}
                      defaultTask = {{
                          task_id: 0,
                          task_name: '',
                          description: '',
                          due_date: colData.due_date,
                          priority_id: 4,
                          labels_id: null,
                          due_time: null
                      }}
                      />
              </div>
          </div>
      </div>
    </div>
  )
}
export default TaskColumn;