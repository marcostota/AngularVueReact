import React, { useEffect, useState } from 'react'
import Messages from '../layout/Messages'
import { useLocation } from 'react-router-dom'
import styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../layout/ProjectCard'
import Loading from '../layout/Loading'



function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMsg, setProjectMsg] = useState('')

    const location = useLocation()
    let msg = ''
    if (location.state) {
        msg = location.state.msg
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => res.json())
                .then((resjson) => {
                    console.log(resjson);
                    setProjects(resjson)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err))
        }, 500);
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((resjson) => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMsg('Project removed')
            }).catch(err => console.log(err))
    }



    return (
        <>
            <div className={styles.project_container}>
                <div className={styles.title_container}>
                    <h1>
                        My projects
                    </h1>
                    <LinkButton to='/newproject' text='Create Project' />
                </div>
                {msg && <Messages type="success" msg={msg} />}
                {projectMsg && <Messages type='success' msg={projectMsg} />}
                <Container customClass='start'>
                    {projects.length > 0 && projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            category={project.category.name}
                            key={project.id}
                            budget={project.budget}
                            handleRemove={removeProject}
                        />))}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 && (
                        <p>There is not project</p>
                    )}
                </Container>
            </div>
        </>
    )

}
export default Projects