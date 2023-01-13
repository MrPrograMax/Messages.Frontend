import React, { FC, ReactElement, useRef, useEffect, useState } from 'react';
import { CreateMessageDto, Client, MessageLookupDto } from '../api/api';
import { FormControl } from 'react-bootstrap';

const apiClient = new Client('https://localhost:44356');

async function createMessage(message: CreateMessageDto) {
    await apiClient.create('1.0', message);
    console.log('Message is created.');
}

const MessageList: FC<{}> = (): ReactElement => {
    let textInput = useRef(null);
    const [messages, setMessages] = useState<MessageLookupDto[] | undefined>(undefined);

    async function getMessages() {
        const messageListVm = await apiClient.getAll('1.0');
        setMessages(messageListVm.messages);
    }

    useEffect(() => {
        setTimeout(getMessages, 500);
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const message: CreateMessageDto = {
                title: "-",
                text: event.currentTarget.value,
            };
            createMessage(message);
            event.currentTarget.value = '';
            setTimeout(getMessages, 500);
        }
    };

    return (
        <div className='GetMessage'>
            Messages
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
                        <div>View key: {message.uploadUrl?.slice(-36)}</div>
                        <br/>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default MessageList;