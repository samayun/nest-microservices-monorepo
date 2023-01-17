## Examples



```js
mutation {
  signup(
    signupInput: {
      email: "samayun@gmail.com"
      password: "123456"
      name: "SALMAN"
    }
  ) {
    id
    name
    email
  }
}
```



```js

{
  login(loginUserInput: { email: "samayun@gmail.com", password: "123456" }) {
    id
    name
  }
}


```




```js
query {
  me {
    id
    name
    email
  }
}
```



```js
mutation {
  logout
}

```

```js
{
  refreshToken{
    accessToken
  }
}

```