import React from 'react';
import styled from 'styled-components';
import  theme  from '../theme';
import { ImgElement, ToDoList } from '../components';

import todoListImg from '../images/todo-list.png';
import emixImg from '../images/e-mix.png';


export function App() {

  return (
    <Container>
      <Wrapper>
        <TopBar>
          <ImgElement src={todoListImg} />
          <ImgElement src={emixImg} />
        </TopBar>
        <Content>
          <ToDoList />
        </Content>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.primary};
  font-family: ${theme.fonts.regular};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopBar = styled.div`
  background-color: ${theme.colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center; 
  width: 100%; 
`;

const Content = styled.div`
  padding: 0 20px;
  width: 100%;
`;