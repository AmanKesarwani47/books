import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { createBooks, updateBooks } from "../../store";
import { useNavigate, useParams } from "react-router-dom";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    language: "",
    country: "",
    pages: "",
    year: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.author.trim()) {
      errors.author = "Author is required";
      isValid = false;
    }

    if (!formData.language.trim()) {
      errors.language = "Language is required";
      isValid = false;
    }

    if (!formData.country.trim()) {
      errors.country = "Country is required";
      isValid = false;
    }

    if (!formData.pages.trim()) {
      errors.pages = "Pages is required";
      isValid = false;
    } else if (isNaN(formData.pages)) {
      errors.pages = "Invalid number of pages";
      isValid = false;
    }

    if (!formData.year.trim()) {
      errors.year = "Year is required";
      isValid = false;
    } else if (isNaN(formData.year)) {
      errors.year = "Invalid year";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      if (id === undefined) {
        dispatch(createBooks(formData)).then((res) => {
          if (res.payload !== undefined && res.payload.status === 200) {
            alert(res.payload.message);
            navigate("/");
          } else {
            alert(res.error.message);
          }
        });
      } else if (id !== undefined) {
        dispatch(updateBooks({ id, booksBody: formData })).then((res) => {
          if (res.payload !== undefined && res.payload.status === 200) {
            alert(res.payload.message);
            navigate("/");
          } else {
            alert(res.error.message);
          }
        });
      }
    }
  };

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editData"));
    if (editData !== null && id !== undefined) {
      setFormData({
        title: editData.title || "",
        author: editData.author || "",
        language: editData.language || "",
        country: editData.country || "",
        pages: editData.pages || "",
        year: editData.year || "",
      });
    } else {
      localStorage.removeItem("editData");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__section">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <div className="error-message">{errors.title}</div>
      </div>
      <div className="form__section">
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <div className="error-message">{errors.author}</div>
      </div>
      <div className="form__section">
        <label htmlFor="language">Language:</label>
        <input
          type="text"
          id="language"
          name="language"
          value={formData.language}
          onChange={handleChange}
        />
        <div className="error-message">{errors.language}</div>
      </div>
      <div className="form__section">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <div className="error-message">{errors.country}</div>
      </div>
      <div className="form__section">
        <label htmlFor="pages">Pages:</label>
        <input
          type="number"
          id="pages"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
        />
        <div className="error-message">{errors.pages}</div>
      </div>
      <div className="form__section">
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
        <div className="error-message">{errors.year}</div>
      </div>
      <button type="submit" className="button form__section">
        Submit
      </button>
    </form>
  );
};

export default AddBook;
