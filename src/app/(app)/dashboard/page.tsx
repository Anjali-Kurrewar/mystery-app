import { Message } from '@/model/User'
import React, { useState } from 'react'

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([])
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard