import React, { useState } from 'react';
import { storage, firestore, app } from '../firebase/Setup'; 
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from 'firebase/storage'; 
import { addDoc, collection } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';

const SellProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePercent, setImagePercent] = useState<number>(0); 
  const [price, setPrice] = useState<number | string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      if (image) {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePercent(Math.round(progress));
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDoc(collection(firestore, "products"), {
                name,
                description,
                price,
                createdAt: new Date().toDateString(),
                imageURL: downloadURL,
              })
                .then(() => {
                  console.log("Product added successfully!");
                  navigate('/');
                })
                .catch((error) => {
                  console.error("Error adding product:", error);
                });
            });
          }
        );
      } else {
        console.log("No image file selected.");
      }
    } catch (error) {
      console.error("Error saving product: ", error);
      setLoading(false);
    }
  };



      // const storageRef = ref(storage, `products/${image.name}`);
      // const uploadTask = uploadBytesResumable(storageRef, image);

      // uploadTask.on(
      //   'state_changed',
      //   (snapshot) => {
      //       console.log("Upload progress:", (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "%");
      //   },
      //   (error) => {
      //     console.error("Error uploading image: ", error);
      //     setLoading(false);
      //   },
      //   async () => {
      //     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      //     await addDoc(collection(firestore, 'products'), {
      //       name,
      //       description,
      //       imageUrl: downloadURL,
      //     });

      //     console.log("Product details saved to Firestore");
      //     setLoading(false);
      //     alert("Product added successfully!");
      //   }
      // );

  //   } catch (error) {
  //     console.error("Error saving product: ", error);
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product for Sale</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="mb-4"> 
          <label className="block text-sm font-medium mb-2">Product Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Submit'}
        </button>
        {loading && <p>Upload Progress: {imagePercent}%</p>}
      </form>
    </div>
  );
};

export default SellProduct;
