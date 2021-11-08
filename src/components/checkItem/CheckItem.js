import styled from 'styled-components';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import theme from '../../theme';


export const CheckItem = (props) => {
  const { note, 
          isChecked, 
          onClickDelete, 
          onCheckboxClick, 
        } = props;

  return (
    <>
      <Item>
        {
          isChecked ?
          <CheckboxInput 
            type="checkbox" 
            onChange={onCheckboxClick} 
            checked={isChecked} 
            disabled 
          />
          :
          <CheckboxInput 
            type="checkbox" 
            onChange={onCheckboxClick} 
            checked={isChecked} 
          />
        }
        <Text isChecked={isChecked} > {note} </Text>
        {
          isChecked ?
          <Icon></Icon>
          :
          <Icon>
            <MdModeEditOutline />
          </Icon>
        }
        <Icon onClick={onClickDelete}>
          <MdDelete />
        </Icon>
      </Item>
    </>
  );
}

const Icon = styled.div`
  padding-left: 10px;
  cursor: pointer;

  :hover {
    color: #0C0B0B;
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.notes};
  border-bottom: 1px solid #E5E5E5;
  padding: 5px 0;
  `;

const CheckboxInput = styled.input`
  cursor: pointer;
  padding-left: 10px;
`;

const Text = styled.span`
  margin-right: auto;
  padding-left: 10px;
  text-decoration: ${props => (props.isChecked === true) && 'line-through'};
  `;

// const TextAreaInput = styled.textarea.attrs({
//   type: 'text'
// })`
//   border-radius: 3px 0 0 3px;
//   height: 30px;
//   width: 80%;
//   caret-color: ${theme.colors.notes};
//   color: ${theme.colors.notes};
//   padding: 0 5px 0 20px;

//   text

//   ::placeholder {
//     font-style: italic;
//     font-size: 0.9rem;
//     color: #C6C6C6;
//   }
// `;

// const EditForm = styled.form`
//   display: flex;
// `;

// const TextSubmit = styled.input`
//   border-radius: 0 3px 3px 0;
//   background-color: #36AFD1;
//   color: #F2F9FC;
//   height: 30px;
//   width: 20%;
//   font-size: 0.9rem;
//   font-weight: 700;
// `;