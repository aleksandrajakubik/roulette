import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { FixedSizeList } from 'react-window';
import ListItemText from "@material-ui/core/ListItemText";
import { ListItem } from '@material-ui/core';

const MQTT = require('mqtt');

function Chat({ user, client }) {

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        client.subscribe('chat')
        client.on('message', (topic, payload, packet) => {
            if(topic==='chat'){
                const today = new Date().toLocaleTimeString();
            setMessages(prevState => [...prevState, today + ' ' + user.nick + ': ' + payload.toString()]);
            }
        });
    }, [client]);

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
                <FixedSizeList height={150} itemSize={25} itemCount={messages.length} >
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

const mapStateToProps = (state) => ({
    client: state.game.client
})

export default connect(mapStateToProps, null)(Chat);