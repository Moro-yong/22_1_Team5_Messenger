import { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './ChatRoom_Style';
import ChatContentsList from './ChatContentsList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { add_user_inputText } from '../../redux/action/inputChatAction';

export default function ChatRoom() {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.userinfo);
  const userChat = useSelector(state => state.chat);
  let [ChatContents, setChatContents] = useState();
  console.log(userdata);
  console.log(userChat);

  useEffect(() => {
    axios
      .get('/data/data.json')
      .then(res => {
        setChatContents(res.data);
      })
      .catch(error => setChatContents(error));
  }, []);

  // ============================================================
  const [input, setInput] = useState('');
  console.log(input);

  const handleChange2 = e => {
    const { value } = e.target;
    setInput(value);
  };

  const handleChange3 = e => {
    e.preventDefault();

    const userInputData = {
      chatList: input,
    };

    dispatch(add_user_inputText(userInputData));
    setInput('');
  };

  // ============================================================

  return (
    <>
      <S.Container>
        <S.LineWrapper>
          <S.Line />
          <S.DayText>Today</S.DayText>
          <S.Line />
        </S.LineWrapper>
        <div>
          {ChatContents?.map((contents, i) => {
            return <ChatContentsList key={i} contents={contents} />;
          })}
        </div>
        <div>
          {userChat?.map(list => {
            return <div key={list.id}>{list.chatList.chatList}</div>;
          })}
        </div>
      </S.Container>
      <S.MessageEditorContainer>
        <S.MessageEditorWrapper>
          <S.PlusIcon />
          <S.TextInput
            placeholder="Enter message"
            onChange={handleChange2}
            value={input}
          />
          <div>
            <S.TextIcon />
            <S.AtSignIcon />
            <S.EmojiIcon />
            <S.EnterIcon onClick={handleChange3} />
          </div>
        </S.MessageEditorWrapper>
      </S.MessageEditorContainer>
    </>
  );
}
