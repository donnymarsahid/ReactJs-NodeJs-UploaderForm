import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    axios.post('http://localhost:3001/post', formData).then((res) => {
      console.log(res);
    });
    console.log(formData);
  };
  return (
    <>
      <div class="container">
        <div class="box">
          <form onSubmit={handlerSubmit}>
            <div class="mb-3">
              <label for="name" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div class="form-text">We'll never share your name with anyone else.</div>
            </div>
            <div class="mb-3">
              <input
                class="form-control"
                type="file"
                id="formFile"
                required
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
