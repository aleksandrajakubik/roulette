import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FixedSizeList } from 'react-window';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItem } from '@material-ui/core';

const MQTT = require('mqtt');

function Chat() {

    const [text, setText] = useState('');
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);

    let isRendered = useRef(false);
    useEffect(() => {
        isRendered = true
        const client = MQTT.connect('ws://10.45.3.251:8000/mqtt');
        client.on('connect', () => {
            console.log('Connected')
            setClient(client)
        });
        client.subscribe('chat')
        client.on('message', (topic, payload, packet) => {
            setMessages(prevState => [...prevState, payload.toString()]);
        });
        return () => {
            isRendered = false
        }
    }, []);

    function handleSend() {
        client.publish('chat', text)
    }
    function renderRow(props) {
        const { index, style } = props;
        return (
            <ListItem key={index} style={style}>
            <ListItemText primary={messages[index]} />
            </ListItem>
        );
      }
    return (
        <div className='Chat'>
            <div className='chatbox'>
                <FixedSizeList  height={150} itemSize={25} itemCount={messages.length} >
                    {renderRow}
                </FixedSizeList>
            </div>
            <input
                type='text'
                name='message'
                placeholder='Send a message'
                onChange={(event) => setText(event.target.value)}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    )
}


export default Chat;