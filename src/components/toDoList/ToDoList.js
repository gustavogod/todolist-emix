import { useForm } from 'react-hook-form';
import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import { useState, useRef } from 'react';

import * as Storage from '../../utils/localStorageAccess';
import { CheckItem } from '..';



export const ToDoList = () => {
  const { register, handleSubmit } = useForm();
  const placeholderText = 'Digite aqui uma nova tarefa...';

  const todoItemsArrayInitState = {
    items: Storage.getItemsFromLocalStorage(),
    isEmpty: (itemsArr) => {
      return itemsArr ? false : true;
    },
    hasItemsToDo: (itemsArr) => {
      return (itemsArr && itemsArr.find( value => value.isChecked === false)) ? true : false;
    },
    hasItemsDone: (itemsArr) => {
      return (itemsArr && itemsArr.find( value => value.isChecked === true)) ? true : false;
    }
  }

  const [todoItemsArray, setTodoItemsArray] = useState(todoItemsArrayInitState);


  const onSubmit = (data, e) => {
    Storage.sendItemToLocalStorage(data);
    e.target.reset();
    setTodoItemsArray({
      ...todoItemsArray,
      items: Storage.getItemsFromLocalStorage()
    }); //atualiza os items
  }

  const handleClickDelete = (item) => {
    const newItems = todoItemsArray.items.filter( value => item !== value);

    Storage.removeItemFromLocalStorage();

    newItems.map((value, index) => {
      Storage.sendItemToLocalStorage(value);
    })

    setTodoItemsArray({
      ...todoItemsArray,
      items: Storage.getItemsFromLocalStorage()
    })
  }

  const handleCheckboxClick = (index) => { //receives the index of the checked item in the todoItemsArray
    //atualizar a prop isChecked do item
    //colocar o item de volta na localStorage atualizada
    todoItemsArray.items[index].isChecked = true;
    const updatedItem = todoItemsArray.items[index];
    const newItems =
      todoItemsArray.items.filter( (value, i) => i !== index)
      .concat(updatedItem);

    Storage.removeItemFromLocalStorage();

    newItems.map((value, i) => {
      Storage.sendItemToLocalStorage(value);
    })

    setTodoItemsArray({
      ...todoItemsArray,
      items: Storage.getItemsFromLocalStorage()
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          { ...register('todoItem', { required: true })}
          placeholder={placeholderText}
          />
        <TextSubmit type="submit" value="ADICIONAR" />
      </Form>

      <WrapperToDoList>
        <Title>A FAZER</Title>
        {
          todoItemsArray.hasItemsToDo(todoItemsArray.items) ?

          todoItemsArray.items.map((value, index) =>
            !value.isChecked
            &&
            <CheckItem
              { ...value}
              onClickDelete={() => handleClickDelete(value)}
              isChecked={value.isChecked}
              onCheckboxClick={() => handleCheckboxClick(index)}
              key={index}
            />
            // &&
            // editItem.isEditing
            // &&
            // <span>AAAAAAAAAAAAAAAAAA</span>
/*             <EditForm action={() => handleEditSubmit()}>
              <TextAreaInput type="text" placeholder="Editar tarefa" required>
                {value.note}
              </TextAreaInput>
              <TextSubmit type="submit" value="EDITAR" />
            </EditForm> */
          )
          :
          <SpanEmptyList>A lista está vazia</SpanEmptyList>

        }

        <TitleDone>FEITO</TitleDone>
        {
          todoItemsArray.hasItemsDone(todoItemsArray.items) ?

          todoItemsArray.items.map((value, index) =>
            value.isChecked
            &&
            <CheckItem
              { ...value}
              onClickDelete={() => handleClickDelete(value)}
              isChecked={value.isChecked}
              onCheckboxClick={() => handleCheckboxClick(index)}
              key={index}
            />
          )
          :
          <SpanEmptyList>A lista está vazia</SpanEmptyList>
        }
      </WrapperToDoList>
    </>
  );
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 20px 0;
  width: 100%;
`;

const TextInput = styled.input.attrs({
  type: 'text'
})`
  border-radius: 3px 0 0 3px;
  height: 30px;
  width: 80%;
  caret-color: ${theme.colors.notes};
  color: ${theme.colors.notes};
  padding: 0 5px 0 20px;

  ::placeholder {
    font-style: italic;
    font-size: 0.9rem;
    color: #C6C6C6;
  }

`;

const TextSubmit = styled.input`
  border-radius: 0 3px 3px 0;
  background-color: #36AFD1;
  color: #F2F9FC;
  height: 30px;
  width: 20%;
  font-size: 0.9rem;
  font-weight: 700;
`;


//-----------------------------------------
//-------TODOLIST STYLIZATION-------------
//-----------------------------------------
const WrapperToDoList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

`;

const Title = styled.span`
  color: ${theme.colors.titles};
  font-size: 0.9rem;
  font-weight: 900;
  padding-bottom: 10px;
`;

const TitleDone = styled(Title)`
  padding-top: 40px
`;

const SpanEmptyList = styled.div`
  color: ${theme.colors.notes};
`;