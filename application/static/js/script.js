

    // get the element that was clicked, this information is given to us in the click event; retrieve data- attributes
const convoClick = (event) => {
    const clickedElement = event.currentTarget;
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

    let message_out = document.createElement('div') //<div>
    message_out.classList.add('message','out'); //<div class="message out"> //

    let mssg = document.createElement('p') //<p>
    mssg.classList.add('mssg'); //<p class="mssg"> //
    mssg.innerHTML = message.message_content

    let mssg_time = document.createElement('p') //<p>
    mssg_time.classList.add('mssg-time'); //<p class="mssg-time"> //
    mssg_time.innerHTML = message.timestamp

    const MainWrapper = document.querySelector('#main-chat-wrap');
    message_out.appendChild(mssg)
    message_out.appendChild(mssg_time)
    message_wrap.appendChild(message_out)  
    MainWrapper.appendChild(message_wrap)
}

