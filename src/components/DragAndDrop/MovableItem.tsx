import { useDrag } from 'react-dnd'
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
interface DropResult {
  due_date: string
}
const EDIT_TASK_BY_ID = gql`mutation MyMutation($id: Int!, $desc: String, $due_date: date, $due_time: time, $priority_id: Int, $task_name: String!,  $labels_id: _int4) {
  update_task_by_pk(pk_columns: {id: $id}, _set: {description: $desc, due_date: $due_date, due_time: $due_time, priority_id: $priority_id, task_name: $task_name, labels_id: $labels_id}) {
    task_name
  }
}
`
function MovableItem(props:any) {
  const [task,setTask] = useState<any>(props.task)
  const [editTask, { data: data2, loading: loading2 }] = useMutation(EDIT_TASK_BY_ID, {
    update(_, result) {
        toast.info("You edited task " + props.task.task_name )
    }
  })
  function parseArrayToInt4(arr: Array<number>):string {
      return "{" + arr.join(',') + "}";
  }
  const [{ isDragging}, drag] = useDrag(() => ({
      type: 'movable_item',
      item: props.task,
      end: (item, monitor) => {
        const newDuedate = monitor.getDropResult<DropResult>()?.due_date
        // console.log(item.task_name,newDuedate)
        if (newDuedate && newDuedate !== item.due_date) {
          props.handleEditTask(item.id,item.task_name,item.description,newDuedate,item.priority_id,item.labels_id,item.due_time)
          editTask({ 
            variables: {
              id: props.task.id,
              task_name: props.task.task_name,
              desc: props.task.description,
              due_date: newDuedate,
              due_time: props.task.due_time,
              priority_id: props.task.priority_id,
              labels_id: props.task.labels_id ? parseArrayToInt4(props.task.labels_id) : null
            }
          })
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
        
      }),
    }),[task])
    const opacity = isDragging ? 0.4 : 1;
    const cursor = isDragging ? 'grabbing': 'pointer'
    useEffect(() => {
      setTask(props.task)
    }, [props]);
  return (
      <div className="movableItem_Box hover:cursor-pointer relative" ref={drag} style={{ opacity, cursor }}>
      {
        !isDragging && props.children 
      }
      </div>
  )
  
}
export default MovableItem;


