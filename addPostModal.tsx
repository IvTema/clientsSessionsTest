import { useState } from "react";
import { Dialog } from "primereact/dialog";
import "./test.scss";

const initialState = {
  author: "",
  content: "",
  count: 0,
};

interface AddPostModalProps {
  modalOpen: boolean;
  handleSendPost: (author: string, content: string) => void;
  handleCloseModal: () => void;
}

const AddPostModal: React.FC<AddPostModalProps> = ({
  modalOpen,
  handleSendPost,
  handleCloseModal,
}) => {
  const [state, setState] = useState(initialState);
  const { author, content, count } = state;

  const handleSendClick = () => {
    if (author && content) {
      handleSendPost(author, content);
      setState(initialState);
    }
  };

  return (
    <Dialog visible={modalOpen} onHide={handleCloseModal}>
      <div className="AddPostModal">
        <div className="ModalHeader">New post</div>
        <input
          className="Author"
          type="text"
          placeholder="Name"
          value={author}
          onChange={(e) => setState({ ...state, author: e.target.value })}
        />
        <textarea
          className="Content"
          value={content}
          maxLength={200}
          onChange={(e) =>
            setState({ ...state, content: e.target.value, count: e.target.value.length })
          }
        />
        <div className="charCount">{`${count}/200`}</div>
        <div className="buttonsWrapper">
          <button onClick={handleCloseModal}>Close</button>
          <button onClick={handleSendClick}>Send</button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddPostModal;
