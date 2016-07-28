# webrtc-meeting

This is a basic webrtc conference meeting application. Right now it works only in the default socket.io namespace ('/'), the feature to create and persist a meeting room is not yet added.

The server is based on koa with corresponding koa middleware and socket.io.

The client application is based on the latest Angular 1.x. UI is very vanilla but the hooks are all present. It currently adds video and chat support.
