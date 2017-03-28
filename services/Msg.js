var statuses = {
    200: "Success",
    401: "You are not permitted to perform this action",
    404: "Page was not found",
    409: "This information is incorrect",
    400: "Parametrs incorrect",
    405: "Login time finished",
    500: "Server erorr"
};


module.exports = {
    getMessage: function(code, message) {
        if (statuses[code]) {

            message = message ? message : statuses[code];
            message = message.replace(/\?/g);
        }

        return {
            "status": code,
            "message": message
        };
    }
};