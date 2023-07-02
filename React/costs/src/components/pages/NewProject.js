import React from 'react'
import styles from './NewProject.module.css'
import ProjectForm from '../project/ProjectForm'
import { useNavigate } from 'react-router-dom'
function NewProject() {

    const navigates = useNavigate()

    function createPost(project) {
        project.cost = 0
        project.services = []

        fetch(`http://localhost:5000/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((res) => res.json())
            .then((resjson) => {
                navigates('/projects', { state: { msg: 'project created sucessfully' } })
            })
            .catch(err => console.log(err))
    }



    return (
        <div className={styles.newproject_container}>
            <h1>Create Project</h1>
            <p>Create your project to add to the services later</p>
            <ProjectForm handleSubmit={createPost} btnText='Create project' />
        </div>
    )
}

export default NewProject