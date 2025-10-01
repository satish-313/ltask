package main

import (
	"fmt"
	"log"
	"net"
)

func main() {
	// dest, err := net.ResolveUDPAddr("udp", "127.0.0.1:1920")
	// if err != nil {
	// 	log.Fatal("address error ", err)
	// }

	conn, err := net.ListenPacket("udp", "127.0.0.1:2000")
	if err != nil {
		log.Fatal("connection error ", err)
	}
	defer conn.Close()
	fmt.Println("Udp Port listening on ", "127.0.0.1:2000")
	for {
		buf := make([]byte, 1000)
		n, addr, err := conn.ReadFrom(buf)
		if err != nil {
			fmt.Println(err)
			break
		}
		fmt.Printf("> \u001b[38;5;9m%s\u001b[0m \n \u001b[38;5;75m%s\u001b[0m", addr, string(buf[:n-1]))
	}

	// conn.WriteTo([]byte("hello "), dest)
}
