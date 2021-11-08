import styled from "styled-components";

export const ImgElement = (props) => {
  const { src } = props;

  return (
    <Image src={src} />
  );
}

const Image = styled.img`
  padding: 10px 20px;
`;