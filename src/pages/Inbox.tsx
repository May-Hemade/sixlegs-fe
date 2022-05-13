import { Box } from "@mui/system"
import React from "react"
import { useEffect } from "react"
import Talk from "talkjs"
import { useAppSelector } from "../redux/hooks"

declare global {
  interface Window {
    talkSession: Talk.Session
  }
}

function Inbox() {
  const userState = useAppSelector((state) => state.user)
  const chatState = useAppSelector((state) => state.chat)

  const profile = userState.profile!
  const talkjsContainer = React.createRef<any>()

  useEffect(() => {
    Talk.ready.then(() => {
      let me = new Talk.User({
        id: profile.id!,
        name: profile.firstName,
        email: profile.email,
        photoUrl: profile.avatar,
        welcomeMessage: "Hey there! How are you? :-)",
        role: "default",
      })
      window.talkSession = new Talk.Session({
        appId: process.env.REACT_APP_TALK_APP_ID!,
        me: me,
      })

      let inbox = window.talkSession.createInbox()

      inbox.mount(talkjsContainer.current)

      if (chatState.currentChatUser) {
        let other = new Talk.User({
          id: chatState.currentChatUser.id!,
          name: chatState.currentChatUser.firstName,
          email: chatState.currentChatUser.email,
          photoUrl: chatState.currentChatUser.avatar,
          welcomeMessage: "Hey, how can I help?",
          role: "default",
        })

        let conversation = window.talkSession.getOrCreateConversation(
          Talk.oneOnOneId(me, other)
        )

        conversation.setParticipant(me)
        conversation.setParticipant(other)

        inbox.select(conversation)
      }
    })
  }, [])

  return (
    <div>
      <Box sx={{ width: 1000, height: 500 }} ref={talkjsContainer}></Box>
    </div>
  )
}

export default Inbox
