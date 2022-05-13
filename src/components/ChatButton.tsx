import { Forum } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { setCurrentChatUser } from "../redux/reducers/chatSlice"
import User from "../types/User"

interface ChatButtonProps {
  user: User
}

function ChatButton(props: ChatButtonProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleChatClick = () => {
    dispatch(setCurrentChatUser(props.user))
    navigate("/inbox")
  }

  return (
    <IconButton onClick={handleChatClick}>
      <Forum />
    </IconButton>
  )
}

export default ChatButton
