import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRouter, publicRouter } from "./router/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { AuthGuard } from "./components/AuthGuard/AuthGuard";
import { useAuth } from "./context/auth";

const GET_ALL_USER_TASK = gql`query MyQuery($userId: Int!) {
  task(where: {user_id: {_eq: $userId}, finished: {_eq: false}}) {
    description
    due_date
    due_time
    finished
    id
    task_name
    priority_id
    labels_id
  }
}
`

function App() {
  const [taskList, setTaskList] = useState<any>();
  const { userId } = useAuth()

  const { data: data, loading: loading, refetch } = useQuery(GET_ALL_USER_TASK, {
    variables: {
      userId: userId || 0
    },
    onCompleted() {
      setTaskList(data.task)
      refetch()
    },
    onError(error) {
      console.log(error)
    }
  });

  if (loading && !data) return <h2>Loading...</h2>

  function handleAddTask(task_id: number, task_name: string, task_desc: string, due_date: any, priority_id: number, labels: any, due_time: any) {
    //API
    const newtask = {
      id: task_id,
      task_name: task_name,
      description: task_desc,
      due_date: due_date,
      priority_id: priority_id,
      labels_id: labels,
      due_time: due_time
    }
    //const newTaskList = [...taskList, newtask]
    setTaskList([...taskList, newtask])
    refetch()
  }
  function handleEditTask(task_id: number, task_name: string, task_desc: string, due_date: any, priority_id: number, labels: any, due_time: any) {
    //API
    const newtask = {
      id: task_id,
      task_name: task_name,
      description: task_desc,
      due_date: due_date,
      priority_id: priority_id,
      labels_id: labels,
      due_time: due_time
    }
    const newTaskList = taskList.map((task: any) => {
      return newtask.id === task.id ? newtask : task
    })
    setTaskList(newTaskList)
    refetch()
  }
  function handleTaskComplete(task_id: number) {
    //API
    const newTaskList = taskList.filter((task: any) => {
      return task.id !== task_id
    })
    setTaskList(newTaskList);
    refetch()
  }

  return (
    <>
      <Router>
        <div className="App">
          <AuthGuard>
            <Routes>
              {
                taskList && privateRouter.map((route, index) => {
                  const Layout = route.layout
                  const Page = route.page
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout path={route.path} handleAddTask={handleAddTask} >
                          <Page
                            tasks={taskList}
                            handleAddTask={handleAddTask}
                            handleEditTask={handleEditTask}
                            handleTaskComplete={handleTaskComplete}
                          />
                        </Layout>
                      }>
                    </Route>
                  )
                })
              }
            </Routes>
          </AuthGuard>
          <Routes>
            {
              publicRouter.map((route, index) => {
                const Layout = route.layout
                const Page = route.page
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout path={route.path}>
                        <Page />
                      </Layout>
                    }>
                  </Route>
                )
              })
            }
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
