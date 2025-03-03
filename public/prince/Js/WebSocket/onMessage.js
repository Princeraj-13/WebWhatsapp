let StartFunc = (event) => {
    try {
        let jVarLocalParse;
        try {
            jVarLocalParse = JSON.parse(event.data); // Try parsing as JSON
        } catch (e) {
            // If parsing fails, treat it as plain text
            console.log("Received plain text message:", event.data);
            return;
        }

        console.log("jVarLocalParse : ", jVarLocalParse);
        switch (jVarLocalParse?.Type) {
            case "wAProfile":
                wAProfile({ inData: jVarLocalParse.res });
                break;
            case "QrCodeGenerated":
                jFLocalHandleQrCode({ inQrReceived: jVarLocalParse.res });
                break;
            case "MessageSent":
                Toastify({
                    text: `Message sent to ${jVarLocalParse.Number}`,
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                }).showToast();
                break;
            default:
                break;
        };
    } catch (error) {
        console.error("Error handling message:", error);
    };
};

let jFLocalToInputUserNameId = (inValue) => {
    let jVarLocalHtmlId = 'UserNameId';
    let jVarLocalUserNameId = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalUserNameId === null === false) {
        jVarLocalUserNameId.innerHTML = inValue;
    };
};

let jFLocalToInputMobileNumberId = (inValue) => {
    let jVarLocalHtmlId = 'MobileNumberId';
    let jVarLocalMobileNumberId = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalMobileNumberId === null === false) {
        jVarLocalMobileNumberId.innerHTML = inValue;
    };
};

const wAProfile = ({ inData }) => {
    jFLocalToInputUserNameId(inData.pushname);
    jFLocalToInputMobileNumberId(inData.me.user);
};

const jFLocalHandleQrCode = ({ inQrReceived }) => {
    console.log("inQrReceived : ", inQrReceived);

    if (inQrReceived === undefined === false) {
        jFCreateQrCode({ inQrCode: inQrReceived });
    };
};

let jFCreateQrCode = ({ inQrCode }) => {
    var canvas = document.getElementById("CanvasId");
    canvas.height = 1;
    canvas.width = 1;
    canvas.style.visibility = 'hidden';

    // Convert the options to an object.
    let opts = {};

    // Finish up the options
    opts.text = inQrCode;
    opts.bcid = "qrcode";
    opts.scaleX = 2;
    opts.scaleY = 2;
    opts.rotate = "N";

    // Draw the bar code to the canvas
    try {
        bwipjs.toCanvas(canvas, opts);
        canvas.style.visibility = 'visible';
    } catch (e) {
        console.log("error : ", e);

        return;
    };
};

export { StartFunc };