import React, { useContext, useState, useEffect } from 'react'
import { Container, Button, Table, Form, InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
import AppHelper from '../../app-helper'
import CategoryContext from '../../CategoryContext';
// import UserContext from '../../UserContext';




export default function index() {

    return (
        <Container>
            <h3>Categories</h3>
            <Button variant="primary">Add</Button>
            <CategoryTable />
        </Container>
    )
}


const CategoryTable = () => {

    const { categories } = useContext(CategoryContext);
    const [categoriesToShow, setCategoriesToShow] = useState(categories);

    // console.log(categories)

    useEffect(() => {
        setCategoriesToShow(categories);
    }, [categories]);
    
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Category Type</th>
                    <th>Category Name</th>
                </tr>
            </thead>
            <tbody>
                {categoriesToShow.map(category => (
                <tr key={category._id}>
                    <td>{category.categoryType}</td>
                    <td>{category.categoryName}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    )
}


const AddCategory = () => {
return (
    <Form>
    <h3>Add Category</h3>
        <Form.Group controlId="categoryType">
            <Form.Label>Category Type: </Form.Label>
            <Form.Control as="select" defaultValue="all">
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="categoryName">
            <Form.Label>Category Name: </Form.Label>
            <Form.Control type="text" placeholder="category name" />
        </Form.Group>
        <Button variant="primary" type="submit">Add</Button>
    </Form>
)
}



// export async function getServerSideProps() {
    
//     const res = await fetch(`${AppHelper.API_URL}/categories`)

//     const data = await res.json();
//     console.log(data)

//     return{
//         props: {
//             data
//         }
//     }
// }