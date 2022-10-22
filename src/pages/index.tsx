import type { NextPage } from 'next'
import useSWR from 'swr'
import { Inquiry } from '@prisma/client'
import { useState } from 'react'

type Inquiries = Array<Inquiry>

const fetcher = (url: string) => fetch(url).then(res => res.json())

const Home: NextPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [productName, setProductName] = useState("");
  const [message, setMessage] = useState("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setProductName("");
    setMessage("");
  }

  const {data, error, mutate} =  useSWR<Inquiries>("/api/inquiries", fetcher);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("/api/inquiries", {method: "POST", body: JSON.stringify({
      name, email, subject, productName, message
    }),
    headers: {
      "Content-Type": "application/json"
    }})

    clearForm();
    mutate();
  }

  if (error) return <div>Error has oocurred</div>
  if (!data) return <div>Now loading...</div>
  
  return (
    <div className="container mx-auto">
      <form action="" className="bg-white rounded px-8 shadow-md mt-3 p-3" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Name
          </label>
          <input onChange={(e) => setName(e.target.value)} type="text" value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Email
          </label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" value={email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Subject
          </label>
          <input onChange={(e) => setSubject(e.target.value)} type="text" value={subject} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            ProductName
          </label>
          <input onChange={(e) => setProductName(e.target.value)} type="text" value={productName} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Message
          </label>
          <textarea onChange={(e) => setMessage(e.target.value)} value={message} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Post</button>
        </div>
      </form>
      <table className="w-full text-sm text-left text-gray-500 mt-3">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Subject</th>
            <th className="py-3 px-6">ProductName</th>
            <th className="py-3 px-6">Message</th>
          </tr>
        </thead>
        <tbody>
          {data.map((inquiry) => {
            return (
              <tr className="bg-white border-b" key={inquiry.id}>
                <td className="py-4 px-6">{inquiry.name}</td>
                <td className="py-4 px-6">{inquiry.email}</td>
                <td className="py-4 px-6">{inquiry.subject}</td>
                <td className="py-4 px-6">{inquiry.productName}</td>
                <td className="py-4 px-6">{inquiry.message}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
