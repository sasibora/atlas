'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, ArrowLeft, MoreVertical, Phone } from 'lucide-react'
import Link from 'next/link'

export default function ChatPage() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi, is this shipment still available?", sender: "them", time: "10:30 AM" },
        { id: 2, text: "Yes, it is. Are you interested?", sender: "me", time: "10:32 AM" },
        { id: 3, text: "I can pick it up tomorrow morning.", sender: "them", time: "10:33 AM" },
    ])
    const [newMessage, setNewMessage] = useState("")

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me", time: "Just now" }])
        setNewMessage("")
    }

    return (
        <div className="flex flex-col h-screen bg-gunmetal">
            {/* Header */}
            <div className="border-b border-surface p-4 flex items-center justify-between bg-[#1a262b]">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-gray-400 hover:text-white">
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-surface relative">
                            {/* Avatar */}
                            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-[#1a262b]"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Ahmed Benali</h3>
                            <p className="text-xs text-green-400">Online</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Phone size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreVertical size={20} />
                    </Button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${msg.sender === 'me' ? 'bg-primary text-black' : 'bg-surface text-white'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-black/60' : 'text-gray-400'}`}>{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-surface bg-[#1a262b]">
                <form onSubmit={handleSend} className="flex gap-4">
                    <Input
                        placeholder="Type a message..."
                        className="bg-gunmetal border-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" size="icon">
                        <Send size={18} />
                    </Button>
                </form>
            </div>
        </div>
    )
}
