import React from 'react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Mail, Inbox, Send, Archive, Trash2 } from 'lucide-react';

interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  category: string;
}

const mockEmails: Email[] = [
  {
    id: 'e1',
    sender: 'john.doe@example.com',
    subject: 'Project Update: Week 3',
    body: 'Hi Faliz, here is the weekly project update. Please review the attached document.',
    timestamp: '2024-06-12T10:00:00Z',
    read: false,
    category: 'work',
  },
  {
    id: 'e2',
    sender: 'newsletter@techdaily.com',
    subject: 'Your Daily Tech Digest',
    body: 'Catch up on the latest in AI and tech. Read more here...', 
    timestamp: '2024-06-12T09:30:00Z',
    read: true,
    category: 'newsletter',
  },
  {
    id: 'e3',
    sender: 'sarah.smith@personal.com',
    subject: 'Weekend Plans?',
    body: 'Hey, are you free this weekend? I was thinking of going hiking.',
    timestamp: '2024-06-11T18:00:00Z',
    read: false,
    category: 'personal',
  },
];

const EmailView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('inbox');
  const [selectedEmail, setSelectedEmail] = React.useState<Email | null>(null);

  const filteredEmails = mockEmails.filter(email => {
    if (selectedCategory === 'inbox') return true;
    if (selectedCategory === 'sent') return false; // Placeholder for sent emails
    if (selectedCategory === 'archive') return false; // Placeholder for archived emails
    if (selectedCategory === 'trash') return false; // Placeholder for trash
    return email.category === selectedCategory;
  });

  return (
    <div className="p-4 flex h-full">
      <div className="w-1/4 pr-4 border-r border-falizBorder">
        <h1 className="text-2xl font-syne font-bold text-falizText mb-6">Email</h1>
        <ul className="space-y-2">
          <li className={`p-2 rounded-md cursor-pointer ${selectedCategory === 'inbox' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => { setSelectedCategory('inbox'); setSelectedEmail(null); }}>
            <Inbox size={18} className="inline-block mr-2" /> Inbox
          </li>
          <li className={`p-2 rounded-md cursor-pointer ${selectedCategory === 'work' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => { setSelectedCategory('work'); setSelectedEmail(null); }}>
            <Mail size={18} className="inline-block mr-2" /> Work
          </li>
          <li className={`p-2 rounded-md cursor-pointer ${selectedCategory === 'personal' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => { setSelectedCategory('personal'); setSelectedEmail(null); }}>
            <Mail size={18} className="inline-block mr-2" /> Personal
          </li>
          <li className={`p-2 rounded-md cursor-pointer ${selectedCategory === 'newsletter' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => { setSelectedCategory('newsletter'); setSelectedEmail(null); }}>
            <Mail size={18} className="inline-block mr-2" /> Newsletters
          </li>
          <li className={`p-2 rounded-md cursor-pointer ${selectedCategory === 'sent' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => { setSelectedCategory('sent'); setSelectedEmail(null); }}>
            <Send size={18} className="inline-block mr-2" /> Sent
          </li>
          <li className={`p-2 rounded-md cursor-pointer ${selectedCategory === 'archive' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => { setSelectedCategory('archive'); setSelectedEmail(null); }}>
            <Archive size={18} className="inline-block mr-2" /> Archive
          </li>
          <li className={`p-2 rounded-md cursor-pointer ${selectedCategory === 'trash' ? 'bg-oracle-dim' : 'hover:bg-falizMuted'}`} onClick={() => { setSelectedCategory('trash'); setSelectedEmail(null); }}>
            <Trash2 size={18} className="inline-block mr-2" /> Trash
          </li>
        </ul>
      </div>

      <div className="w-1/3 pr-4 border-r border-falizBorder overflow-y-auto">
        <h2 className="text-xl font-syne font-bold text-falizText mb-4">Inbox</h2>
        {filteredEmails.length > 0 ? (
          <ul className="space-y-2">
            {filteredEmails.map(email => (
              <li 
                key={email.id} 
                className={`p-3 rounded-lg cursor-pointer ${selectedEmail?.id === email.id ? 'bg-elevated border border-oracle-DEFAULT' : 'bg-surface hover:bg-falizMuted'} ${email.read ? 'opacity-70' : 'font-semibold'}`}
                onClick={() => setSelectedEmail(email)}
              >
                <p className="text-falizText text-sm">From: {email.sender}</p>
                <p className="text-falizText text-base">Subject: {email.subject}</p>
                <p className="text-falizMutedText text-xs mt-1">{new Date(email.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-falizMutedText">No emails in this category.</p>
        )}
      </div>

      <div className="w-1/2 pl-4 overflow-y-auto">
        {selectedEmail ? (
          <GlassCard title={selectedEmail.subject} icon={<Mail size={20} className="text-oracle-DEFAULT" />}>
            <div className="mb-4">
              <p className="text-falizMutedText text-sm">From: {selectedEmail.sender}</p>
              <p className="text-falizMutedText text-sm">Date: {new Date(selectedEmail.timestamp).toLocaleString()}</p>
            </div>
            <div className="bg-void p-4 rounded-md text-falizText whitespace-pre-wrap">
              {selectedEmail.body}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-4 py-2 bg-cyber-DEFAULT rounded-md text-white hover:bg-cyber-dim">Reply</button>
              <button className="px-4 py-2 bg-falizMuted rounded-md text-falizText hover:bg-falizMuted/70">Archive</button>
              <button className="px-4 py-2 bg-danger rounded-md text-white hover:bg-danger/70">Delete</button>
            </div>
          </GlassCard>
        ) : (
          <div className="flex items-center justify-center h-full text-falizMutedText">
            <p>Select an email to view its content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailView;
