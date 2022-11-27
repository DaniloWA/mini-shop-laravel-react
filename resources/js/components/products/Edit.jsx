import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null)
    const [type, setType] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [avatar, setAvatar] = useState(true)

    const { id } = useParams()

    useEffect(()=>{
        getProducts()
    }, [])

    const changeHandler = (e) => {

        let file = e.target.files[0]
        let limit = 1024 * 1024 * 2

        if(file['size'] > limit){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong',
                footer: 'Why do I have this issue ?'
            })
        } else {
            setPhoto(file)
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('photo', photo)
        formData.append('type', type)
        formData.append('quantity', quantity)
        formData.append('price', price)

        await axios.post(`http://mini-shop-laravel-react.test/api/update_product/${id}`, formData)
            .then(({data})=> {
                toast.fire({
                    icon: "success",
                    title: "Product update successfully"
                })
                navigate("/")
            })
            .catch(({Response})=> {
                console.log(Response)
            })
    }

    const getProducts = async () => {
        await axios.get(`/api/get_edit_product/${id}`)
        .then(({data})=> {
            //console.log(data)
            const { name, description, photo, type, quantity, price } = data.product
            setName(name)
            setPrice(price)
            setDescription(description)
            setPhoto(photo)
            setType(type)
            setQuantity(quantity)
        })
        .catch(({Response})=> {
            console.log(Response)
        })
    }

    const ourImage = (img) => {
        return "/"+img
    }

    return (
        <div className="container">
            <div className="product_edit">

            <div className="titlebar">
                <div className="titlebar_item">
                    <h1>Edit Product</h1>
                </div>
                <div className="titlebar_item">

                </div>
            </div>

            <div className="card_wrapper">
                <div className="wrapper_left">
                    <div className="card">
                        <p>Name</p>
                        <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}}/>

                        <p>Description (Optional)</p>
                        <textarea cols="10" rows="5" value={description} onChange={(event)=>{setDescription(event.target.value)}}></textarea>

                        <div className="media">
                            <ul className="images_list">
                                <li className="image_item">
                                    <div className="image_item-img">
                                        {photo &&
                                            <img src={photo} width="117px" height="100px" alt="" />
                                        }
                                    </div>
                                </li>
                                <li className="image_item">
                                    <form className="image_item-form">
                                        <label className="image_item-form--label">Add Image</label>
                                        <input type="file" className="image_item-form--input" onChange={changeHandler} />
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="wrapper_right">
                    <div className="card">
                        <p>Product Type</p>
                        <input type="text" value={type} onChange={(event)=>{setType(event.target.value)}}/>
                        <hr className='hr' />

                        <p>Inventory</p>
                        <input type="text" value={quantity} onChange={(event)=>{setQuantity(event.target.value)}} />
                        <hr className="hr" />

                        <p>Price</p>
                        <input type="text" value={price} onChange={(event)=>{setPrice(event.target.value)}}/>

                        <div className="br"></div>
                    </div>
                </div>
            </div>

            <div className="titlebar">
                <div className="titlebar_item">

                </div>
                <div className="titlebar_item">
                    <button className="btn" onClick={(event)=>updateProduct(event)}>
                        Save
                    </button>
                </div>
            </div>

            </div>
        </div>
    )
}

export default Edit
