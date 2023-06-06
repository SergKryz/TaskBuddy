
import { ReactComponent as DataScience } from '../../Assests/Svg/dataScience.svg'
import { ReactComponent as Python } from '../../Assests/Svg/python.svg'
import { ReactComponent as UX } from '../../Assests/Svg/Ux.svg'
import React from 'react'
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from 'react'
import { getTaskByProjectId, getProjectByProjectId, getProjects, getTaskbyName,EditTodoCall } from '../service/ApiCalls'

import { Link, useNavigate } from 'react-router-dom'


function Project() {

  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [project, setProjects] = useState([])
  const [date, setDate] = useState([])
  const [displayProject, setDisplayProject] = useState([])
  const [displayTask, setDisplayTask] = useState([])
  const [showTodoDetails, setShowTodoDetails] = useState([])

  const [selectedProject, setSelectedProject] = useState('');

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    console.log(e.target.value,"list")
    const projectResponse = getProjectByProjectId(e.target.value);
    projectResponse.then((data) => {
      setDisplayProject(data)
    })
    projectResponse.catch((err) => {
      console.log(err)
    })

  };
  
  useEffect(()=>{

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate)
  },[])


  useEffect(() => {
    const projectResponse = getProjects(currentUser?.uid);
    projectResponse.then((data) => {
      setProjects(data)
    })
    projectResponse.catch((err) => {
      console.log(err)
    })

  }, [])

  useEffect(() => {
    const response = getTaskByProjectId(selectedProject);
    response.then((data) => {
      setDisplayTask(data)
    })
    response.catch((err) => {
      console.log(err)
    })

  }, [selectedProject])

  const showDetails = (todoName) => {
    const taskResponse = getTaskbyName(todoName, currentUser?.uid);
    taskResponse.then((data) => {
      setShowTodoDetails(data)

    })
    taskResponse.catch((err) => {
      console.log(err)
    })
  }
  function changeStatus(todoId,todo){
    const updatedData={
        "userId":todo.userId,
        "todoId":todo.todoId,
        "todoName":todo.todoName,
        "todoDescription":todo.todoDescription,
        "deadline":todo.deadline,
        "projectId":todo.projectId,
        "status":"done"
    }
    const response = EditTodoCall(updatedData);
    response.then((data)=>{
   
        window.location.reload()
    })
    response.catch((err)=>{console.log(err)})
}



  return (
    <div className="container-fluid">
      <div className="row my-3 p-4">
        <div className="col-lg-6 d-flex flex-column align-items-left "><h1>Project Task</h1> <h1> Management </h1></div>
        <div className="col-lg-6 d-flex justify-content-center flex-wrap">
         
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-3 offset-lg-1 d-flex flex-column" style={{ justifyContent: 'space-between' }}>
          <label htmlFor="projectSelect" className='select-text'>Select a project:</label>
          <select id="projectSelect" className='form-control' value={selectedProject} onChange={handleProjectChange}>
            <option value="">Select</option>
            {project.projectlist && project.projectlist.map((project) => (
              <option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </option>
            ))}
          </select>

        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-11 d-flex" style={{ justifyContent: 'space-between' }}>
          <h5>Assignment Brief</h5>
          <h5>Due Date : {displayProject.projectlist && displayProject.projectlist[0] && displayProject.projectlist[0].projectDeadline}</h5>
        </div>
      </div>
      <div className="line"></div>
      <div className="row justify-content-center">
        <div className="col-lg-10 my-3">
          <p>{displayProject.projectlist && displayProject.projectlist[0].projectDescription}</p>
        </div>
      </div>
      <div className="line mb-4"></div>
      <div className="container-fluid mt-5">
        <div className="row " style={{ justifyContent: 'space-evenly' }}>
          <div className="col-lg-5">  <div className="row">
            <div className="col-lg-12">
              <table class="table task-tab-table">
                <thead>
                  <tr>
                    <th scope="col">Task Name <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.66667 1.41675L5.31311 1.06319L5.66667 0.709641L6.02022 1.06319L5.66667 1.41675ZM6.16667 12.0417C6.16667 12.3179 5.94281 12.5417 5.66667 12.5417C5.39052 12.5417 5.16667 12.3179 5.16667 12.0417L6.16667 12.0417ZM2.47978 3.89653L5.31311 1.06319L6.02022 1.7703L3.18689 4.60363L2.47978 3.89653ZM6.02022 1.06319L8.85355 3.89653L8.14645 4.60363L5.31311 1.7703L6.02022 1.06319ZM6.16667 1.41675L6.16667 12.0417L5.16667 12.0417L5.16667 1.41675L6.16667 1.41675Z" fill="#222222" />
                      <path d="M11.3333 15.5833L10.9798 15.9368L11.3333 16.2904L11.6869 15.9368L11.3333 15.5833ZM11.8333 4.95825C11.8333 4.68211 11.6095 4.45825 11.3333 4.45825C11.0572 4.45825 10.8333 4.68211 10.8333 4.95825L11.8333 4.95825ZM8.14645 13.1035L10.9798 15.9368L11.6869 15.2297L8.85355 12.3964L8.14645 13.1035ZM11.6869 15.9368L14.5202 13.1035L13.8131 12.3964L10.9798 15.2297L11.6869 15.9368ZM11.8333 15.5833L11.8333 4.95825L10.8333 4.95825L10.8333 15.5833L11.8333 15.5833Z" fill="#222222" />
                    </svg>
                    </th>
                    <th scope="col">Due Date <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.66667 1.41675L5.31311 1.06319L5.66667 0.709641L6.02022 1.06319L5.66667 1.41675ZM6.16667 12.0417C6.16667 12.3179 5.94281 12.5417 5.66667 12.5417C5.39052 12.5417 5.16667 12.3179 5.16667 12.0417L6.16667 12.0417ZM2.47978 3.89653L5.31311 1.06319L6.02022 1.7703L3.18689 4.60363L2.47978 3.89653ZM6.02022 1.06319L8.85355 3.89653L8.14645 4.60363L5.31311 1.7703L6.02022 1.06319ZM6.16667 1.41675L6.16667 12.0417L5.16667 12.0417L5.16667 1.41675L6.16667 1.41675Z" fill="#222222" />
                      <path d="M11.3333 15.5833L10.9798 15.9368L11.3333 16.2904L11.6869 15.9368L11.3333 15.5833ZM11.8333 4.95825C11.8333 4.68211 11.6095 4.45825 11.3333 4.45825C11.0572 4.45825 10.8333 4.68211 10.8333 4.95825L11.8333 4.95825ZM8.14645 13.1035L10.9798 15.9368L11.6869 15.2297L8.85355 12.3964L8.14645 13.1035ZM11.6869 15.9368L14.5202 13.1035L13.8131 12.3964L10.9798 15.2297L11.6869 15.9368ZM11.8333 15.5833L11.8333 4.95825L10.8333 4.95825L10.8333 15.5833L11.8333 15.5833Z" fill="#222222" />
                    </svg>
                    </th>
                    <th scope="col">Status</th>
                    
                  </tr>
                </thead>
                <div className="bottom-line2"></div>
                <tbody className='task-tab-table-body'>
                  {
                    displayTask.todoList &&  displayTask.todoList.length > 0 ? displayTask.todoList.map((todo) => (
                      <tr onClick={() => {
                        showDetails(todo.todoName)
                      }} style={{ cursor: "pointer" }}>
                        <td >
                          <div className="row">
                            <div className="col-lg-12 d-flex align-items-center" >
                              {/* <div className="check mr-4"></div> */}
                              <input type="checkbox" className='check mr-4'  disabled={todo.status=="done"}  onClick={()=>{changeStatus(todo.todoId,todo)}}/>
                              <div className="task-table-task-text">{todo.todoName}</div>
                            </div>
                          </div>
                        </td>
                        <td >{todo.deadline}</td>
                        <td >
                          <div className="row">
                            <div className="col-lg-12">
                              {
                                (todo.status == "inprogress")  ? ((date==todo.deadline)? <button className='btn btn-due inprogress '>Due</button> : <button className='btn btn-due'>Inprogress</button>)  : <button className='btn btn-due done'>Done</button>
                              }
                             
                            </div>
                          </div>

                        </td>
                     

                      </tr>
                    )): selectedProject ? <div className="task d-flex">
                    <span className='task-text'>No Task Found for the particular Project</span>
                </div> : 
                <div className="task d-flex">
                <span className='task-text'>Please select a project</span> 
            </div>
                  }


                </tbody>
              </table>
            </div>
          </div></div>
          <div className="col-lg-6">
            <div className="task-detail-box mt-5">
              <div className="row">
                <div className="container-fluid task-detail-head">
                  <div className="col-lg-12 d-flex " style={{ justifyContent: 'space-between' }}>
                    <h3>Task</h3>
                    <span className='text2'>
                      {showTodoDetails.todoList && showTodoDetails.todoList[0].todoName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row my-4">
                <div className="container-fluid d-flex " style={{ justifyContent: 'space-between' }}>
                  <div className="h6">Due Date</div>
                  <div className="datebox d-flex align-items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="path-1-outside-1_28_804" maskUnits="userSpaceOnUse" x="3" y="4" width="17" height="17" fill="black">
                        <rect fill="white" x="3" y="4" width="17" height="17" />
                        <path d="M13.5858 7.41421L6.39171 14.6083C6.19706 14.8029 6.09974 14.9003 6.03276 15.0186C5.96579 15.1368 5.93241 15.2704 5.86564 15.5374L5.20211 18.1915C5.11186 18.5526 5.06673 18.7331 5.16682 18.8332C5.2669 18.9333 5.44742 18.8881 5.80844 18.7979L5.80845 18.7979L8.46257 18.1344C8.72963 18.0676 8.86316 18.0342 8.98145 17.9672C9.09974 17.9003 9.19706 17.8029 9.39171 17.6083L16.5858 10.4142L16.5858 10.4142C17.2525 9.74755 17.5858 9.41421 17.5858 9C17.5858 8.58579 17.2525 8.25245 16.5858 7.58579L16.4142 7.41421C15.7475 6.74755 15.4142 6.41421 15 6.41421C14.5858 6.41421 14.2525 6.74755 13.5858 7.41421Z" />
                      </mask>
                      <path d="M6.39171 14.6083L7.80593 16.0225L7.80593 16.0225L6.39171 14.6083ZM13.5858 7.41421L12.1716 6L12.1716 6L13.5858 7.41421ZM16.4142 7.41421L15 8.82843L15 8.82843L16.4142 7.41421ZM16.5858 7.58579L18 6.17157L18 6.17157L16.5858 7.58579ZM16.5858 10.4142L18 11.8284L16.5858 10.4142ZM9.39171 17.6083L7.9775 16.1941L7.9775 16.1941L9.39171 17.6083ZM5.86564 15.5374L7.80593 16.0225L7.80593 16.0225L5.86564 15.5374ZM5.20211 18.1915L3.26183 17.7065H3.26183L5.20211 18.1915ZM5.80845 18.7979L5.32338 16.8576L5.23624 16.8794L5.15141 16.9089L5.80845 18.7979ZM8.46257 18.1344L7.97751 16.1941L7.9775 16.1941L8.46257 18.1344ZM5.16682 18.8332L6.58103 17.419L6.58103 17.419L5.16682 18.8332ZM5.80844 18.7979L6.29351 20.7382L6.38065 20.7164L6.46549 20.6869L5.80844 18.7979ZM8.98145 17.9672L7.99605 16.2268L7.99605 16.2268L8.98145 17.9672ZM16.5858 10.4142L18 11.8284L18 11.8284L16.5858 10.4142ZM6.03276 15.0186L4.29236 14.0332L4.29236 14.0332L6.03276 15.0186ZM7.80593 16.0225L15 8.82843L12.1716 6L4.9775 13.1941L7.80593 16.0225ZM15 8.82843L15.1716 9L18 6.17157L17.8284 6L15 8.82843ZM15.1716 9L7.9775 16.1941L10.8059 19.0225L18 11.8284L15.1716 9ZM3.92536 15.0524L3.26183 17.7065L7.1424 18.6766L7.80593 16.0225L3.92536 15.0524ZM6.29352 20.7382L8.94764 20.0746L7.9775 16.1941L5.32338 16.8576L6.29352 20.7382ZM3.26183 17.7065C3.233 17.8218 3.15055 18.1296 3.12259 18.4155C3.0922 18.7261 3.06509 19.5599 3.7526 20.2474L6.58103 17.419C6.84671 17.6847 6.99914 18.0005 7.06644 18.2928C7.12513 18.5478 7.10965 18.7429 7.10358 18.8049C7.09699 18.8724 7.08792 18.904 7.097 18.8631C7.10537 18.8253 7.11788 18.7747 7.1424 18.6766L3.26183 17.7065ZM5.15141 16.9089L5.1514 16.9089L6.46549 20.6869L6.46549 20.6869L5.15141 16.9089ZM5.32338 16.8576C5.22531 16.8821 5.17467 16.8946 5.13694 16.903C5.09595 16.9121 5.12762 16.903 5.19506 16.8964C5.25712 16.8903 5.45223 16.8749 5.70717 16.9336C5.99955 17.0009 6.31535 17.1533 6.58103 17.419L3.7526 20.2474C4.44011 20.9349 5.27387 20.9078 5.58449 20.8774C5.87039 20.8494 6.17822 20.767 6.29351 20.7382L5.32338 16.8576ZM7.9775 16.1941C7.95279 16.2188 7.9317 16.2399 7.91214 16.2593C7.89271 16.2787 7.87671 16.2945 7.86293 16.308C7.84916 16.3215 7.83911 16.3312 7.83172 16.3382C7.82812 16.3416 7.82545 16.3441 7.8236 16.3458C7.82176 16.3475 7.8209 16.3483 7.82092 16.3482C7.82094 16.3482 7.82198 16.3473 7.82395 16.3456C7.82592 16.3439 7.82893 16.3413 7.83291 16.338C7.84086 16.3314 7.85292 16.3216 7.86866 16.3098C7.88455 16.2979 7.90362 16.2843 7.92564 16.2699C7.94776 16.2553 7.97131 16.2408 7.99605 16.2268L9.96684 19.7076C10.376 19.476 10.6864 19.1421 10.8059 19.0225L7.9775 16.1941ZM8.94764 20.0746C9.11169 20.0336 9.55771 19.9393 9.96685 19.7076L7.99605 16.2268C8.02079 16.2128 8.0453 16.2001 8.06917 16.1886C8.09292 16.1772 8.11438 16.1678 8.13277 16.1603C8.15098 16.1529 8.16553 16.1475 8.17529 16.1441C8.18017 16.1424 8.18394 16.1412 8.18642 16.1404C8.1889 16.1395 8.19024 16.1391 8.19026 16.1391C8.19028 16.1391 8.18918 16.1395 8.18677 16.1402C8.18435 16.1409 8.18084 16.1419 8.17606 16.1432C8.16625 16.1459 8.15278 16.1496 8.13414 16.1544C8.11548 16.1593 8.09368 16.1649 8.0671 16.1716C8.04034 16.1784 8.0114 16.1856 7.97751 16.1941L8.94764 20.0746ZM15.1716 9C15.3435 9.17192 15.4698 9.29842 15.5738 9.40785C15.6786 9.518 15.7263 9.57518 15.7457 9.60073C15.7644 9.62524 15.7226 9.57638 15.6774 9.46782C15.6254 9.34332 15.5858 9.18102 15.5858 9H19.5858C19.5858 8.17978 19.2282 7.57075 18.9258 7.1744C18.6586 6.82421 18.2934 6.46493 18 6.17157L15.1716 9ZM18 11.8284L18 11.8284L15.1716 8.99999L15.1716 9L18 11.8284ZM18 11.8284C18.2934 11.5351 18.6586 11.1758 18.9258 10.8256C19.2282 10.4292 19.5858 9.82022 19.5858 9H15.5858C15.5858 8.81898 15.6254 8.65668 15.6774 8.53218C15.7226 8.42362 15.7644 8.37476 15.7457 8.39927C15.7263 8.42482 15.6786 8.482 15.5738 8.59215C15.4698 8.70157 15.3435 8.82807 15.1716 9L18 11.8284ZM15 8.82843C15.1719 8.6565 15.2984 8.53019 15.4078 8.42615C15.518 8.32142 15.5752 8.27375 15.6007 8.25426C15.6252 8.23555 15.5764 8.27736 15.4678 8.32264C15.3433 8.37455 15.181 8.41421 15 8.41421V4.41421C14.1798 4.41421 13.5707 4.77177 13.1744 5.07417C12.8242 5.34136 12.4649 5.70664 12.1716 6L15 8.82843ZM17.8284 6C17.5351 5.70665 17.1758 5.34136 16.8256 5.07417C16.4293 4.77177 15.8202 4.41421 15 4.41421V8.41421C14.819 8.41421 14.6567 8.37455 14.5322 8.32264C14.4236 8.27736 14.3748 8.23555 14.3993 8.25426C14.4248 8.27375 14.482 8.32142 14.5922 8.42615C14.7016 8.53019 14.8281 8.6565 15 8.82843L17.8284 6ZM4.9775 13.1941C4.85793 13.3136 4.52401 13.624 4.29236 14.0332L7.77316 16.0039C7.75915 16.0287 7.7447 16.0522 7.73014 16.0744C7.71565 16.0964 7.70207 16.1155 7.69016 16.1313C7.67837 16.1471 7.66863 16.1591 7.66202 16.1671C7.65871 16.1711 7.65613 16.1741 7.65442 16.1761C7.65271 16.178 7.65178 16.1791 7.65176 16.1791C7.65174 16.1791 7.65252 16.1782 7.65422 16.1764C7.65593 16.1745 7.65842 16.1719 7.66184 16.1683C7.66884 16.1609 7.67852 16.1508 7.692 16.1371C7.7055 16.1233 7.72132 16.1073 7.74066 16.0879C7.76013 16.0683 7.78122 16.0472 7.80593 16.0225L4.9775 13.1941ZM7.80593 16.0225C7.8144 15.9886 7.82164 15.9597 7.82839 15.9329C7.8351 15.9063 7.84068 15.8845 7.84556 15.8659C7.85043 15.8472 7.85407 15.8337 7.8568 15.8239C7.85813 15.8192 7.85914 15.8157 7.85984 15.8132C7.86054 15.8108 7.86088 15.8097 7.86088 15.8097C7.86087 15.8098 7.86046 15.8111 7.85965 15.8136C7.85884 15.8161 7.85758 15.8198 7.85588 15.8247C7.85246 15.8345 7.84713 15.849 7.8397 15.8672C7.8322 15.8856 7.82284 15.9071 7.81141 15.9308C7.79993 15.9547 7.78717 15.9792 7.77316 16.0039L4.29236 14.0332C4.06071 14.4423 3.96637 14.8883 3.92536 15.0524L7.80593 16.0225Z" fill="#4A4646" mask="url(#path-1-outside-1_28_804)" />
                      <path d="M12.5 7.5L15.5 5.5L18.5 8.5L16.5 11.5L12.5 7.5Z" fill="#4A4646" />
                    </svg>

                    <input type="date" defaultValue={showTodoDetails.todoList && showTodoDetails.todoList[0].deadline} style={{ border: 'none', borderRadius: '10px' }} />
                  </div>

                </div>
              </div>
              <h6 className='my-3'>Add Note</h6>
              <div className="row">
                <div className="container-fluid">
                  <div className="col-lg-12 d-flex justify-content-center">
                    <textarea name="" id="" cols="30" rows="5" defaultValue={showTodoDetails.todoList && showTodoDetails.todoList[0].todoDescription} placeholder='Write your note here' ></textarea>
                  </div>
                </div>
              </div>
              <div className="row my-2 ">
               
              </div>
              <div className="row">
                <div className="task-detail-box-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project