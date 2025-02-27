import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import colors from "../../../../assets/scss/_theme-vars.module.scss";

export const FileUploadContainer = styled.section`
  position: relative;
  margin: 5px 0 0;
  border: 2px dotted ${(props) => props?.error ? colors.errorMain : props?.theme.palette.mode === 'light' ? colors.grey300 : colors.white300};
  padding: 20px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
`;

export const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

export const DragDropText = styled.p`
  font-weight: bold;
  font-size: 10px;
  color: ${(props) => props?.error ? colors.errorMain : props?.theme.palette.mode === 'light' ? colors.grey300 : colors.white300};
  letter-spacing: 2.2px;
  margin-top: 0;
  text-align: center;
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: 1px solid ${colors.primaryMain};
  cursor: pointer;
  font-size: 0.6rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 6px;
  color: ${colors.primaryMain};
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;

  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 100%;
    background: ${colors.primaryMain};
    z-index: -1;
    transition: width 250ms ease-in-out;
  }

  i {
    font-size: 18px;
    margin-right: 5px;
    border-right: 1px solid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-width: 500px) {
    width: 70%;
  }
  @media only screen and (max-width: 350px) {
    width: 100%;
  }

  &:hover {
    color: #fff;
    outline: 0;
    background: transparent;

    &:after {
      width: 110%;
    }
  }

  &:focus {
    outline: 0;
    background: transparent;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`;

export const FilePreviewContainer = styled.article`
  span {
    font-size: 14px;
  }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  //@media only screen and (max-width: 400px) {
  //  flex-direction: column;
  //}
`;

export const FileMetaData = styled.div`
  display: ${(props) => props?.display};
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  background-color: rgba(5, 5, 5, 0.55);

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveFileIcon = styled(IconButton)`
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export const PreviewContainer = styled.section`
  padding: 0.25rem;
  height: 120px;
  border-radius: 6px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.55;

    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }
`;

export const PreviewContainerWithMaxHeight = styled.section`
  padding: 0.25rem;
  max-height: ${(props) => props.maxHeight};
  border-radius: 6px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.55;

    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

export const VideoPreview = styled.video`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;
