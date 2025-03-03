import { StartFunc as onOpen } from "./onOpen.js";
import { StartFunc as onMessage } from "./onMessage.js";

let jVarLocalHostName = window.location.host;
let jVarLocalUrlForWS;

if (location.protocol === "https:") {
    jVarLocalUrlForWS = "wss://" + jVarLocalHostName;
}
if (location.protocol === "http:") {
    jVarLocalUrlForWS = "ws://" + jVarLocalHostName;
}

let StartFunc = () => {
    jFLocalEstablishWebSocket();
    jFLocalSetupEventListeners();
};

let jFLocalEstablishWebSocket = () => {
    webSocket = new WebSocket(jVarLocalUrlForWS);

    webSocket.onopen = onOpen;
    webSocket.onmessage = onMessage;

    webSocket.onclose = function (e) {
        console.log("WebSocket connection closed");
    };
};

let jFLocalSetupEventListeners = () => {
    document.getElementById('sendMessageBtn').addEventListener('click', () => {
        const fileInput = document.getElementById('csvFile');
        const message = document.getElementById('message').value;

        if (fileInput.files.length === 0) {
            Toastify({
                text: "Please upload a CSV file",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }).showToast();
            return;
        }

        if (!message) {
            Toastify({
                text: "Please enter a message",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }).showToast();
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            const numbers = text.split('\n').map(line => line.trim()).filter(line => line);

            numbers.forEach(number => {
                const payload = JSON.stringify({
                    Type: "SendMessage",
                    Number: number,
                    Message: message
                });
                webSocket.send(payload);
            });

            Toastify({
                text: "Messages sent successfully!",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
        };

        reader.readAsText(file);
    });
};

StartFunc();