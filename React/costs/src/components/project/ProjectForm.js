import React, { useEffect, useState } from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'


function ProjectForm({ btnText, handleSubmit, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})


    useEffect(() => {
        fetch(`http://localhost:5000/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((resjson) => {
                setCategories(resjson)
            })
            .catch(err => console.log(err))

    }, [])


    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        })

    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Project name'
                name='name'
                placeholder='Insert name of the project'
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type='number'
                text='Project budget'
                name='budget'
                placeholder='Insert budget total'
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select name='category_id' text='Select category'
                options={categories}
                value={project.category ? project.category.id : ''}
                handleOnChange={handleCategory} />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm