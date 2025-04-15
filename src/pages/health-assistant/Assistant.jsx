import React, { useEffect, useRef, useState } from 'react'
import './assistant.style.css'

import Markdown from 'react-markdown'
import axios from '../../configs/axios-configs'
import { Spinner } from '../../components/loaders/Spinner'
import { toast } from 'react-toastify'

import assistantLogo from "../../assets/svg/doctor-ai.svg"
import { useSearchParams } from 'react-router-dom'

export const Assistant = () => {
    // handle auto text area height
    const handleTextArea = (e) => {
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
    }

    // handle input 
    const [input, setInput] = useState('');
    const handleInput = (e) => {
        setInput(e.target.value);
        handleTextArea(e);
    };

    // handle chat list
    const [messageList, setMessageList] = useState([]);

    // handle assistant message
    const [generating, setGenerating] = useState(false);

    const handleRespospnseGeneration = async (prompt) => {
        setGenerating(true);
        try {
            const response = await axios.get(`/ai/get-health-ai-response?prompt=${prompt}`);
            const message = response.data?.data?.message;
            // const answerMatch = message.match(/"answer": "([\s\S]*?)"/);
            // const answer = answerMatch ? answerMatch[1] : message;
            return message;
        } catch (error) {
            console.error(error);
        }
        setGenerating(false);
    }

    const handleMessageSend = async (text) => {
        if ((input == "" && !text) || generating) return;
        setMessageList([...messageList, { bubbleFor: "user", message: input || text }]);
        handleScrollDown(); // scroll to bottom
        setInput('');
        const message = await handleRespospnseGeneration(input || text);
        setMessageList([...messageList, { bubbleFor: "user", message: input || text }, { bubbleFor: "assistant", message: message?.content }]);
        setGenerating(false);
    }

    // key event handler
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleMessageSend();
        }
    }

    // handle scrolling
    const boxRef = useRef(null);
    const handleScrollDown = () => {
        if (boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
    }

    // handle prompt from query
    const [query] = useSearchParams();
    const prompt = query.get("prompt");
    useEffect(() => {
        if (prompt) {
            handleMessageSend(decodeURI(prompt));
        }
    }, [prompt]);


    useEffect(() => {
        document.title = "Redhper - Health Assistant";
    }, []);

    // sample query list
    const sampleQueries = [
        "What are the symptoms of diabetes?",
        "How can I improve my sleep quality?",
        "What are the best exercises for weight loss?",
        "What should I eat to boost my immune system?",
        "How do I manage stress effectively?"
    ];

    return (
        <div className='container ph-assistant-container'>
            <h5 className='mb-3'>Chintu C1.0</h5>
            <div className='ph-assistant-chat-box' ref={boxRef}>
                <div className='ph-assistant-chat-box-content'>
                    {
                        messageList.map((message, index) => {
                            return <ChatBubble key={index} bubbleFor={message.bubbleFor} message={message.message} />
                        })
                    }
                    {generating &&
                        <div className='d-flex align-center gap-2'>
                            <Spinner colorCode={1} width={20} />
                            <div className='ph-response-loading-text'>Generating responses...</div>
                        </div>
                    }
                    {
                        messageList?.length == 0 && <div className='ph-assistant-chat-box-placeholder text-center'>
                            <img src={assistantLogo} alt="" width={100} className='mb-3' />
                            <h3>Hello, I'm Chintu</h3>
                            <p>Ask me anything about your health and I will try to help you.</p>
                            <h6>Try to ask</h6>
                            <div className='ph-d-flex-wrap justify-content-center'>
                                {
                                    sampleQueries.map((item, index) => {
                                        return <div key={index} className='ph-assistant-query-sample-item' onClick={() => handleMessageSend(item)}>{item}</div>
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='ph-assistant-input-box'>
                <textarea name="" id="" className='ph-assistant-textarea' placeholder='Type your health queries' onChange={handleInput} disabled={generating} value={input} onKeyDown={handleKeyDown}></textarea>
                <div className='ph-assistant-input-btn-box'>
                    <button className="ph-btn ph-btn-primary ph-assistant-send-btn" onClick={handleMessageSend} disabled={generating}>
                        {generating ? <Spinner width={50} /> : <i className="ri-arrow-up-line"></i>}
                    </button>
                </div>
            </div>
        </div>
    )
}

const ChatBubble = ({ bubbleFor = "user", message = "" }) => {
    const handleCopy = (e) => {
        navigator.clipboard.writeText(message);
        toast.info("Text Coppied")
    }

    return (
        <div className={`ph-chat-bubble ${bubbleFor === "user" ? "ph-chat-bubble-user" : "ph-chat-bubble-assistant"}`}>
            <div className='ph-chat-bubble-content'>
                {bubbleFor === "assistant" &&
                    <div>
                        <img src={assistantLogo} alt="" width={40} className='ph-chat-bubble-assistant-img' />
                    </div>}
                <div>
                    <Markdown>{message}</Markdown>
                </div>
            </div>
            <div className='ph-chat-bubble-btn-box'>
                <button className="ph-btn ph-btn-shadow" onClick={() => handleCopy(message)}><i className="ri-file-copy-line"></i></button>
            </div>
        </div>
    )
}
