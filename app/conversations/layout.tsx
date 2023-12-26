import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUsers';
import SideBar from '../components/sidebar/SideBar';
import ConversationsList from './components/ConversationsList';

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <SideBar>
      <div className="h-full">
        <ConversationsList initialItems={conversations} users={users} />

        {children}
      </div>
    </SideBar>
  );
}
