import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get)=>({
    messages:[],
    users:[],
    selectedUser: null,
    isMessageLoading: false,
    isUsersLoading: false,

    getUsers: async()=>{
        set({isUsersLoading: true});
        try{
            const res = await axiosInstance.get('/message/users');
            set({users: res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
          set({isUsersLoading: false})  
        }
    },
    getMessage: async(userId)=>{
        set({isMessageLoading: true});
        try{
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages: res.data})
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isMessageLoading: false})
        }
    },
    sendMessage: async(messageData)=>{
        const {selectedUser, messages} = get();
        console.log('messa', messageData, selectedUser);
        try{
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({messages : [...messages, res.data]})
        }catch(error){
            console.log('hiii', error)
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
          const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
          if (!isMessageSentFromSelectedUser) return;
    
          set({
            messages: [...get().messages, newMessage],
          });
        });
      },
    
      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
      },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
    
}));