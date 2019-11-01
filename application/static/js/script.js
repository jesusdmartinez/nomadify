

const convoClick = (event) => {

    // get the element that was clicked, this information is given to us in the click event; retrieve data- attributes
    const clickedElement = event.currentTarget;
    Array.from(document.getElementsByClassName('convo')).forEach(x => x.classList.remove('active'))

    clickedElement.classList.add('active');
    const dataAttributes = clickedElement.dataset

    //get the chat_id value from the dataset of clickedElement
    const chat_id = dataAttributes.chat_id

    // populate chat_id into the #sndr-chat
    document.querySelector('#sndr-chat_id').value = chat_id;
    retrieveMessages(clickedElement.dataset);

}


    // looks for all "convo" classes, and adds an "eventlistener"; then if there is a "click" it runs convoClick
for(let element of document.getElementsByClassName("convo")) {
    element.addEventListener('click', convoClick, false);
}


    // gets JSON, then translates to JS, then runs addMessage function (with JS)
const retrieveMessages = (req_info) => {
    const url = `/api/chats/${req_info.chat_id}/messages?user_id=${req_info.user_id}`
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(messages => {
        addMessages(messages)
    })
}



    // for each element in "message" run create messagewrapper
const addMessages = (messages) => {
    let MainWrapper = document.querySelector('#main-chat-wrap');
    MainWrapper.innerHTML = '';
    for(let message of messages) {
        createMessageWrappers(message)
    }
}



    // create a new wrapper for each message
const createMessageWrappers = (message) => {

    let message_wrap = document.createElement('div') //<div>
    message_wrap.classList.add('message-wrap'); //<div class="message-wrap"> //

    let message_in_out = document.createElement('div') //<div>
    const urlParams = new URLSearchParams(window.location.search)
    const user_id = urlParams.get('user_id');

    if (user_id == message.user.user_id) {
    message_in_out.classList.add('message','out'); //<div class="message out"> //
    }

    else {
    message_in_out.classList.add('message','in'); //<div class="message in"> //
    }

    let mssg = document.createElement('p') //<p>
    mssg.classList.add('mssg'); //<p class="mssg"> //
    mssg.innerHTML = message.message_content

    let mssg_time = document.createElement('p') //<p>
    mssg_time.classList.add('mssg-time'); //<p class="mssg-time"> //
    mssg_time.innerHTML = message.timestamp

    const MainWrapper = document.querySelector('#main-chat-wrap');
    message_in_out.appendChild(mssg)
    message_in_out.appendChild(mssg_time)
    message_wrap.appendChild(message_in_out)
    MainWrapper.appendChild(message_wrap)
}


const submitNewMessage = (e) => {
    e.preventDefault();

    // collect data needed for message POST request
    const newMessage = document.querySelector('#new-message').value;
    const chat_id = document.querySelector('#sndr-chat_id').value;
    const user_id = document.querySelector('#sndr-name').value;

    // make POST request to create the message
    const url = `/api/chats/${chat_id}/messages?user_id=${user_id}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'message_content': newMessage
        })
    })
    .then(res => {
        return res.json()
    })
    .then(data => {

        createMessageWrappers(data)
        document.querySelector('#new-message').value = '';
        scrollMyMessage()
        document.querySelector(`div.convo[data-chat_id="${chat_id}"] p.mssg`).innerHTML = data.message_content
    })
}

function scrollMyMessage() {
    let div = document.getElementById('main-chat-wrap');
    div.scrollTop = div.scrollHeight - div.clientHeight;
}
setInterval(scrollMyMessage, 500);



//main-chat-wrap.scrollTo(0,document.body.scrollHeight);

//function scrollToBottom(#main-chat-wrap){
//   var div = document.getElementById(#main-chat-wrap);
//   div.scrollTop = div.scrollHeight - div.clientHeight;
//}

//var element = document.querySelector(".element-selector");
//element.scrollIntoView();




//// modify convo last message
//const convolastMessage = (message) => {
//    let most_recent_convo = document.getElementsByClassName("convo-last-mssg"))
//
//    <p class="mssg">To Be Determined</p>
//
//
//    let mssg_time = document.createElement('p') //<p>
//    mssg_time.classList.add('mssg-time'); //<p class="mssg-time"> //
//    mssg_time.innerHTML = message.timestamp
//
//    const MainWrapper = document.querySelector('#main-chat-wrap');
//    message_out.appendChild(mssg)
//    message_out.appendChild(mssg_time)
//    message_wrap.appendChild(message_out)
//    MainWrapper.appendChild(message_wrap)
//