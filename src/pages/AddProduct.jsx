import React, { useState } from 'react';
import { storage, db } from '../Config/Config';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddProducts = () => {

    const navigate = useNavigate();

    const toastStyle = {
      backgroundColor: '#3e3a31', // Green background color
      color: 'white', // White text color
      padding: '10px', // Padding
      borderRadius: '4px', // Rounded corners
    };

    const [products, setProducts] = useState([{
        title: '',
        description: '',
        type: '',
        price: '',
        image: null,
        imageError: ''
    }]);
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const handleInputChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    const handleImageChange = (index, e) => {
        const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG', 'image/webp'];
        const selectedFile = e.target.files[0];

        const updatedProducts = [...products];

        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                updatedProducts[index].image = selectedFile;
                updatedProducts[index].imageError = '';
            } else {
                updatedProducts[index].image = null;
                updatedProducts[index].imageError = 'Please select a valid image file type (png or jpg)';
            }
        } else {
            updatedProducts[index].imageError = 'Please select your file';
        }

        setProducts(updatedProducts);
    };

    const handleAddProduct = () => {
        setProducts([...products, {
            title: '',
            description: '',
            type: '',
            price: '',
            image: null,
            imageError: ''
        }]);
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadError('');

        const uploadPromises = products.map(async (product) => {
            if (product.image) {
                const storageRef = ref(storage, `product-images/${product.type.toUpperCase()}/${Date.now()}`);

                try {
                    await uploadBytes(storageRef, product.image);
                    const url = await getDownloadURL(storageRef);

                    await addDoc(collection(db, `products-${product.type.toUpperCase()}`), {
                        title: product.title,
                        producttype: product.type,
                        description: product.description,
                        price: Number(product.price),
                        url
                          
                    }); toast.success('Added successfully', {
                        position: 'top-right',
                        autoClose: 5000,
                        style: toastStyle,
                      });
                } catch (error) {
                    console.error("Error uploading document: ", error);
                    setUploadError(error.message);
                }
            }
        });

        try {
            await Promise.all(uploadPromises); // Wait for all uploads to complete
            setSuccessMsg('Products added successfully');
            setProducts([{
                title: '',
                description: '',
                type: '',
                price: '',
                image: null,
                imageError: ''
            }]);
            setTimeout(() => {
                setSuccessMsg('');
                navigate('/');
            }, 3000);
        } catch (error) {
            // Handle errors during upload
        }
    }; 

    return (
        <div className="container mx-auto px-4 py-8 my-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Products</h1>
                <hr className="mb-6" />
                {successMsg && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
                        {successMsg}
                    </div>
                )}
                <form autoComplete="off" className="space-y-6" onSubmit={handleSubmit}>
                    {products.map((product, index) => (
                        <div key={index} className="border p-6 rounded-lg bg-gray-50">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Product {index + 1}</h2>
                            <input
                                type="text"
                                className="w-full md:w-3/4 lg:w-1/2 px-4 py-2 border rounded mb-4 focus:ring focus:outline-none"
                                placeholder="Product Title"
                                required
                                value={product.title}
                                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                            />
                            <input
                                type="text"
                                className="w-full md:w-3/4 lg:w-1/2 px-4 py-2 border rounded mb-4 focus:ring focus:outline-none"
                                placeholder="Product Description"
                                required
                                value={product.description}
                                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                            />
                            <select
                                className="w-full md:w-3/4 lg:w-1/2 px-4 py-2 border rounded mb-4 focus:ring focus:outline-none"
                                required
                                value={product.type}
                                onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                            >
                                <option value="">Select Product Type</option>
                                <option value="shopitems">shopitems</option>
                                
                                {/* Add more options as needed */}
                            </select>
                            <input
                                type="number"
                                className="w-full md:w-3/4 lg:w-1/2 px-4 py-2 border rounded mb-4 focus:ring focus:outline-none"
                                placeholder="Product Price"
                                required
                                value={product.price}
                                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                            />
                            <input
                                type="file"
                                id={`file-${index}`}
                                className="w-full md:w-3/4 lg:w-1/2 px-4 py-2 border rounded mb-4 focus:ring focus:outline-none"
                                required
                                onChange={(e) => handleImageChange(index, e)}
                            />
                            {product.imageError && (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
                                    {product.imageError}
                                </div>
                            )}
                            {index > 0 && (
                                <button type="button" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => handleRemoveProduct(index)}>
                                    Remove Product
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleAddProduct}>
                        Add Another Product
                    </button>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                            SUBMIT
                        </button>
                    </div>
                </form>
                {uploadError && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4 rounded">
                        {uploadError}
                    </div>
                )}
            </div>
        </div>
    );
};
