/**
 * Created by vamsi on 5/18/16.
 */

const Message =  (type, data, to, from, module) => {
    return {
        'type': type,
        'data': data,
        'to': to,
        'from': from,
        'module': module
    };
};

export default Message;

