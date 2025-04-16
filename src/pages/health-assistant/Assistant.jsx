import React, { useEffect, useRef, useState } from 'react'
import './assistant.style.css'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ index: 0, message: "" });
    const [source, setSource] = useState(null);
    const [streamError, setStreamError] = useState(false);
    const handleRespospnseGeneration = async (prompt, index) => {
        setGenerating(true);
        setLoading(true);
        setStreamError(false);
        try {
            if (source) {
                source.close();
            }
            setResponse({ index: 0, message: "" });
            const newSource = new EventSource(`${process.env.REACT_APP_PROXY_URI}/api/v1/ai/get-health-ai-response?prompt=${prompt}`);
            setSource(newSource);
            newSource.onmessage = (event) => {
                setLoading(false);
                if (event.data === '[DONE]') {
                    setGenerating(false);
                    setResponse({ ...response, index: index, stopped: true });
                    newSource.close();
                    return;
                }
                const parsed = JSON.parse(event.data);
                if (parsed.content) {
                    setResponse(prev => ({ index: index, message: prev.message + parsed.content }));
                }
            };

            newSource.onerror = (err) => {
                console.error('Streaming failed', err);
                setGenerating(false);
                setResponse({ ...response, index: index, error: true, message: "Something went wrong!", stopped: true });
                newSource.close();
            };


            return () => {
                newSource.close();
            };
        } catch (error) {
            console.error(error);
            setGenerating(false);
            setStreamError(true);
        }
    }

    const handleMessageSend = async (text) => {
        if ((input == "" && !text) || generating) return;
        setMessageList([...messageList, { bubbleFor: "user", message: input || text }]);
        // handleScrollDown(); // scroll to bottom
        setInput('');
        handleRespospnseGeneration(input || text, messageList?.length + 1); // send message to assistant
    }

    useEffect(() => {
        if (response?.message) {
            setMessageList(prev => {
                const updatedList = [...prev];
                updatedList[response.index] = { bubbleFor: "assistant", ...response };
                return updatedList;
            });
            console.log(response);
            
            // handleScrollDown(); // scroll to bottom
        }
    }, [response])

    // key event handler
    const handleKeyDown = (e) => {
        if (window.innerWidth > 768 && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleMessageSend();
        }
    }

    // handle scrolling
    const boxRef = useRef(null);
    const bottomRef = useRef(null);
    const [autoScroll, setAutoScroll] = useState(true);
    // Auto-scroll logic
    useEffect(() => {
        if (autoScroll && boxRef.current) {
            boxRef.current.scrollTop = boxRef.current.scrollHeight;
        }
    }, [messageList, autoScroll]);

    // Detect manual scrolling
    const handleScroll = () => {
        if (boxRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = boxRef.current;
            const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10; // Small threshold
            setAutoScroll(isAtBottom);
        }
    };

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
            <h5 className='mb-3'>Assistant Jyoti</h5>
            <div className='ph-assistant-chat-box' ref={boxRef} onScroll={handleScroll}>
                <div className='ph-assistant-chat-box-content'>
                    {
                        messageList.map((message, index) => {
                            return <ChatBubble key={index} bubbleFor={message.bubbleFor} message={message.message} />
                        })
                    }
                    {loading &&
                        <div className='d-flex align-center gap-2'>
                            <Spinner colorCode={1} width={20} />
                            <div className='ph-response-loading-text'>Generating responses...</div>
                        </div>
                    }
                    {
                        messageList?.length == 0 && <div className='ph-assistant-chat-box-placeholder text-center'>
                            <img src={assistantLogo} alt="" width={100} className='mb-3' />
                            <h3>Hello, I'm Jyoti</h3>
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
                    <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
                </div>
            </div>
            {(bubbleFor === "assistant" && message?.error) && <div className='ph-stream-error-msg'>
                <span>Failed to stream! Unexpected error occurs.</span>
            </div>}
            {(bubbleFor === "user" || message?.stopped) && <div className='ph-chat-bubble-btn-box'>
                <button className="ph-btn ph-btn-shadow" onClick={() => handleCopy(message)}><i className="ri-file-copy-line"></i></button>
                {bubbleFor === "assistant" && <button className="ph-btn ph-btn-shadow" onClick={() => handleCopy(message)}><i class="ri-restart-line"></i></button>}
            </div>}
        </div>
    )
}
