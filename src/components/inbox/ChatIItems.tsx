import gravatarUrl from "gravatar-url";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import { User } from "../../features/types/types";
import getPartnerInfo from "../../utils/helper-functions";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
  const { user } = useSelector((state: any) => state.auth) || {};
  const { email } = (user as User) || {};

  const { data, isLoading, isError, error } = useGetConversationsQuery(
    "sumit@learnwithsumit.com"
  );
  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={(error as unknown as any)?.data} />
      </li>
    );
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <li className="m-2 text-center">No conversations found!</li>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = data.map((conversation: any) => {
      const { id, message, timestamp } = conversation;
      const { email } = user || {};
      const { name, email: partnerEmail } = getPartnerInfo(
        conversation.users,
        email
      );

      return (
        <li key={id}>
          <Link to={`/inbox/${id}`}>
            <ChatItem
              avatar={gravatarUrl(partnerEmail, {
                size: 80,
              })}
              name={name}
              lastMessage={message}
              lastTime={moment(timestamp).fromNow()}
            />
          </Link>
        </li>
      );
    });
  }

  return <ul>{content}</ul>;
}
