import { TextField, FormControl, Box, Stack, IconButton, Button, Container } from "@mui/material"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCirclePlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from './CreateSet.module.css';
import EditCard from './EditCard';

const CreateSet = (props) => {
  const nagivate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([
    {
      term: '',
      definiion: ''
    }
  ]);

  function handleChange(evt) {
    const value = evt.target.value;
    const id = evt.target.name;
    const field = id.slice(0, -1);
    const index = id.slice(id.length - 1);
    console.log(`Field ${id} was changed to ${value} at index ${index}`);
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
    alert('Your set has been saved!');
    nagivate('/flashcards');
  }

  const cardElements = cards.map((info, i) => {
    return (
      <>
        <EditCard
          handleChange={handleChange}
          handleDelete={handleDelete}
          index={i}
          term={info.term}
          def={info.def}></EditCard>
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
        </div>
      </Container>
    </div>
  );
};

export default CreateSet