import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
    }),
    getConversation: builder.query({
      query: ({ userEmail, participantEmail }: any) =>
        `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
    }),
    addConversation: builder.mutation({
      query: (data) => ({
        url: "/conversations",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
        const conversation = await queryFulfilled;

        if (conversation?.data?.id) {
          // silent entry to message table
          const users: any[] = arg?.users || {};

          const senderUser = arg.loggedInUser;
          const receiverUser = users?.find(
            (user: any) => user.email !== arg.loggedInUser?.email
          );

          dispatch(
            messagesApi.endpoints.addMessage.initiate({
              conversationId: conversation?.data?.id,
              sender: senderUser,
              receiver: receiverUser,
              message: arg.message,
              timestamp: arg.timestamp,
            })
          );
        }
      },
    }),
    editConversation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          conversationsApi.util.updateQueryData(
            "getConversations",
            arg?.data?.loggedInUser?.email,
            (draft: any[]) => {
              // eslint-disable-next-line eqeqeq
              const draftConversation = draft.find((c: any) => c.id == arg.id);
              draftConversation.message = arg.data.message;
              draftConversation.timestamp = arg.data.timestamp;
            }
          )
        );

        // optimistic cache update end

        try {
          const conversation = await queryFulfilled;
          if (conversation?.data?.id) {
            // silent entry to message table
            const users: any[] = arg.data?.users || {};
            const senderUser = arg.data?.loggedInUser;
            const receiverUser = users?.find(
              (user: any) => user.email !== arg.data?.loggedInUser?.email
            );

            dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.data?.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg.data.message,
                timestamp: arg.data.timestamp,
              })
            );
          }
        } catch (error) {
          patchResult1.undo();
        }
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationsApi;
