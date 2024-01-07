import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/firebase/firebaseConfig";
import { User } from "@/types";
import { query, collection, orderBy, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import Link from "next/link";

const ChatHistoryBox = async ({ chatId }: { chatId: string }) => {
  const session = await getServerSession(authOptions);
  const uid = (session?.user as User)?.id;

  const messagesCollection = collection(
    db,
    `users/${uid}/chats/${chatId}/messages`
  );
  const q = query(messagesCollection, orderBy("timestamp", "asc"));
  const messages = await getDocs(q);

  return (
    <div>
      <Link className="flex p-1 rounded-md mb-1 hover:bg-gray-200" href="/">
        <h3 className="truncate font-medium">
          {messages?.docs[0]?.data().searchQuery}
        </h3>
      </Link>
    </div>
  );
};

export default ChatHistoryBox;
