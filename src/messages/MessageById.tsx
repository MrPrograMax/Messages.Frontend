import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import { Client, MessageLookupDto } from '../api/api';
import { FormControl } from 'react-bootstrap';

const apiClient = new Client('https://localhost:44356');

const MessageById: FC<{}> = (): ReactElement => {
    let textInput = useRef(null);
    const [messages, setMessages] = useState<any[] | undefined>(undefined);
    let messageKey = '00000000-0000-0000-0000-000000000000'

    async function getMessages() {
        setMessages([ await apiClient.get(messageKey, '1.0') ]);
    }

    useEffect(() => {
        setTimeout(getMessages, 500);
    }, []);
    

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            messageKey = event.currentTarget.value.toString();
            event.currentTarget.value = '';
            setTimeout(getMessages, 500);
        }
    };

    return (
        <div>
            Message
            <div>
                <br/>
                <div>Enter the key</div>
                <FormControl ref={textInput} onKeyPress={handleKeyPress} />
            </div>
            <section className='mainsec'>
            <br/>
                {messages?.map((message) => (
                    <div>
                        <div>Title: {message.title}</div>
                        <div>Text: {message.text}</div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default MessageById;