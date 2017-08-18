package httpserver

import (
	"net/http"

	"github.com/googollee/go-socket.io"
)

type WebsocketCORSServer struct {
	SocketIoServer *socketio.Server
}

func (s *WebsocketCORSServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	origin := r.Header.Get("Origin")
	w.Header().Set("Access-Control-Allow-Origin", origin)
	s.SocketIoServer.ServeHTTP(w, r)
}