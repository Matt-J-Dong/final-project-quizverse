import { TextField, FormControl, Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EditSet.module.css';
import EditCard from '../CreateSet/EditCard';
import axios from 'axios';

const EditSet = (props) => {
  const location = useLocation();
  const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editted, setEditted] = useState(false);
  const [cards, setCards] = useState([
    {
      term: '',
      definiion: ''
    }
  ]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/edit-set?id=${id}`).then((response) => {
      const data = response.data;
      setTitle(data.title);
      setDescription(data.description);
      setCards(data.cards);
    });
  }, []);

  function handleChange(evt) {
    setEditted(true);
    const value = evt.target.value;
    const id = evt.target.name;
    const field = id.slice(0, -1);
    const index = id.slice(id.length - 1);
    const newCard = cards[index];
    newCard[field] = value;
    setCards(
      cards
        .slice(0, index)
        .concat(newCard)
        .concat(cards.slice(index + 1))
    );
    console.log(cards);
  }

  function handleDelete(index) {
    setCards(cards.slice(0, index).concat(cards.slice(index + 1)));
  }

  function addNew() {
    setCards(cards.concat({ term: '', definition: '' }));
  }

  function handleSubmit(evt) {
    setEditted(false);
    const info = {
      title: { title },
      description: { description },
      cards: { cards },
      number_of_cards: cards.length
    };

    axios({
      method: 'POST',
      data: {
        info
      },
      withCredentials: true,
      url: 'http://localhost:3001/create-set'
    }).then((response) => {
      console.log('Data successfully sent!');
      alert('Your set has been saved!');
      navigate(`/view/${id}`);
    });
  }

  // var state = {
  //   // Initially, no file is selected
  //   selectedFile: null
  // };

  var changeFile = (event) => {
    setFile(event.target.files[0]);
  };
  // On file upload (click the upload button)
  var uploadFile = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('myFile', file, file.name);

    // Details of the uploaded file
    console.log(file);

    // Request made to the backend api
    // Send formData object
    axios.post('http://localhost:3001/image-upload', formData);
  };

  // File content to be displayed after
  // file upload is complete
  var fileData = () => {
    if (file) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {file.name}</p>

          <p>File Type: {file.type}</p>

          <p>Last Modified: {file.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  const cardElements = cards.map((info, i) => {
    return (
      <>
        <EditCard
          handleChange={handleChange}
          handleDelete={handleDelete}
          index={i}
          term={info.term}
          def={info.definition}></EditCard>
      </>
    );
  });

  return (
    <div className={styles.SetContainer}>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
          overflowY: 'scroll'
        }}>
        <div className={styles['set-controls']}>
          <Button
            startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => navigate(`/view/${id}`)}>
            Back to set
          </Button>
          <Button onClick={handleSubmit} disabled={!editted} variant="outlined">
            Save
          </Button>
        </div>
        <FormControl sx={{ m: 1, width: '86vw' }} variant="outlined">
          <TextField
            margin="dense"
            id="filled-basic"
            label="Subject, chapter, unit, etc"
            variant="filled"
            size="small"
            value={title}
            helperText="TITLE"
            onChange={(evt) => {
              setEditted(true);
              setTitle(evt.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Enter a description"
            helperText="DESCRIPTION"
            variant="filled"
            multiline
            rows={3}
            value={description}
            onChange={(evt) => {
              setEditted(true);
              setDescription(evt.target.value);
            }}
          />
        </FormControl>

        {cardElements}

        <div className={styles['form-actions']}>
          <Button
            variant="outlined"
            onClick={addNew}
            startIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
            Add Card
          </Button>
          <Button onClick={handleSubmit} variant="outlined">
            Create Set
          </Button>
          <input type="file" name="file" onChange={changeFile}></input>
          <Button onClick={uploadFile} variant="outlined">
            Upload Image
          </Button>
          {fileData}
        </div>
      </Container>
    </div>
  );
};

export default EditSet;
