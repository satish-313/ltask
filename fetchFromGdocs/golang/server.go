package main

import (
	"context"
	"fmt"
	"log"

	_ "golang.org/x/oauth2"
	_ "golang.org/x/oauth2/jwt"
	docs "google.golang.org/api/docs/v1"
	option "google.golang.org/api/option"
)

func main() {
	ctx := context.Background()

	s, e := docs.NewService(ctx, option.WithCredentialsFile("./keys.json"))
	if e != nil {
		log.Fatal("authorization error ", e)
	}
	d := s.Documents.Get("1ucghRTeyrLVlAqyPlHHVJjwis3AiQfPmXxcd0oSyZSQ")
	fmt.Println(d.Do())
}
